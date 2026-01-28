import { DatePipe } from '@angular/common';
import { BaseDataService, CallInfo, DataManager, DataState, StatefulData, NetworkService } from '@spi/shared';
import cloneDeep from 'lodash-es/cloneDeep';
import { Observable, combineLatest, of } from 'rxjs';
import { catchError, filter, map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * Follows the Faacade pattern of abstracting the data key from the view.
 * This pattern encourages each service to be responsible for a single store entries and their CRUD
 * implementations with the backend.
 */
export class BaseFormDataService extends BaseDataService {
    // need to be configured per service
    protected storeNamespaces: string[] = [];

    constructor(
        dataManager: DataManager,
        protected override networkService: NetworkService,
        protected storeKey: string,
        public router: Router
    ) {
        super(dataManager, networkService);
    }

    // convenience function for grabbing route param keys, as they are usually needed for CRUD

    public getRouteParams(): any {
        let deepestChild = this.router.routerState.root.snapshot;
        while (deepestChild.firstChild) {
            deepestChild = deepestChild.firstChild;
        }
        return deepestChild.params;
    }

    protected getMultiWrapperData(
        context: string,
        callInfos: (CallInfo | Observable<StatefulData> | Observable<Boolean>)[],
        processCallback: (responseData: any) => any,
        namespaces?: string[]
    ): Observable<StatefulData> {
        const sData: StatefulData = this.dataManager.getSync(context);
        return this.dataManager.getData(context).pipe(
            filter((sData: StatefulData) => {
                const sDataInst: StatefulData = this.dataManager.getSync(context);
                if (sDataInst.state === 'empty' || sDataInst.state === 'stale') {
                    this.dataManager.modifyState(context, 'loading');
                    const multiApiCalls: Observable<any>[] = [];
                    callInfos.forEach((callInfo: CallInfo | Observable<StatefulData> | Observable<Boolean>) => {
                        if (callInfo instanceof CallInfo) {
                            multiApiCalls.push(this.networkService.fetchData(callInfo));
                        } else {
                            multiApiCalls.push(callInfo);
                        }
                    });
                    combineLatest(multiApiCalls)
                        .pipe(
                            // first(),
                            filter((data) =>
                                data.every((item) => {
                                    return (
                                        item.hasOwnProperty('data') ||
                                        item.state === 'synced' ||
                                        item.state === 'error' ||
                                        item === true
                                    );
                                })
                            ),
                            map((data) =>
                                data?.map((item) => {
                                    if (item.state) {
                                        return item.currentData;
                                    } else {
                                        return item;
                                    }
                                })
                            ),

                            map((responses) => {
                                return processCallback(responses);
                            }),
                            take(1),
                            tap((data) => {
                                if (data && data.hasOwnProperty('type') && data.type === 'CE') {
                                    this.dataManager.setData(
                                        context,
                                        new StatefulData('error', sData.currentData, sData.originalData),
                                        namespaces
                                    );
                                } else {
                                    this.dataManager.setData(
                                        context,
                                        new StatefulData('synced', data, data),
                                        namespaces
                                    );
                                }
                            }),
                            // Any error should be caught at this level so that an error can be put into the store
                            catchError((error) => {
                                if (error?.error?.message) {
                                    error.message = error?.error?.message;
                                }
                                this.dataManager.setData(
                                    context,
                                    new StatefulData('error', sData.currentData, sData.originalData, error),
                                    namespaces
                                );
                                return of(error);
                            })
                        )
                        .subscribe();
                    return false;
                }
                return true;
            })
        );
    }

    public override getData(
        context: string,
        callInfo: CallInfo,
        processCallback: (responseData: any) => any,
        namespaces?: string[]
    ): Observable<StatefulData> {
        const wrappedCall = (resp: any) => {
            return processCallback(resp);
        };
        // Form type normalization - replace 'NEW' suffix variants with base types
        if (callInfo?.callBody?.input) {
            const typeMapping: Record<string, string> = {
                'ISRNEW': 'ISR',
                'AF_INITIATIONNEW': 'AF_INITIATION',
                'AF_CONCEPTNEW': 'AF_CONCEPT',
                'AF_APPRAISALNEW': 'AF_APPRAISAL',
                'AF_APPROVALNEW': 'AF_APPROVAL',
                'AF_NEGOTIATIONNEW': 'AF_NEGOTIATION'
            };
            
            for (const [newType, baseType] of Object.entries(typeMapping)) {
                if (callInfo.callBody.input.includes(newType)) {
                    callInfo.callBody.input = callInfo.callBody.input.replace(newType, baseType);
                    break;
                }
            }
        }
        return super.getData(context, callInfo, wrappedCall, namespaces);
    }

    /**
     * Sets the data for the service, not for the back end. Only keeps in the store.
     * This can also be called internally to set data after a backend transaction if need be.
     * @param newDAta value entered into the store
     * @param resync if true, will set the data as synced and set a clone of newData as the oripinal data
     *
     */
    public setData(newData: any, resync: boolean = false) {
        const originalData = resync ? cloneDeep(newData) : this.dataManager.getSync(this.storeKey).originalData;
        const entry = new StatefulData(resync ? 'synced' : 'dirty', newData, originalData);
        this.dataManager.setData(this.storeKey, entry, this.storeNamespaces);
    }

    public revertData() {
        /* const entry = this.dataManager.getSync(this.storeKey);
        if (entry.currentData && entry.state !== 'empty') {
            const revertEntry = new StatefulData('synced', cloneDeep(entry.originalData), entry.originalData);
            this.dataManager.setData(this.storeKey, revertEntry, this.storeNamespaces);
        } */
    }

    public setDataState(state: DataState, storeKey?: string): void {
        const entry = this.dataManager.getSync(storeKey || this.storeKey);
        this.dataManager.setData(
            storeKey || this.storeKey,
            new StatefulData(state, entry.currentData, entry.originalData)
        );
    }

    // This update is for the save before navigation issue we are facing. This will be a more maintainable solution
    public saveDataObservable(): Observable<any> {
        return of('If you see this string, imlement the "saveDataBase function in "' + this);
    }

    /**
     * Override this in child classes
     *  For non-pre-save pages ignore this base implementation, or follow the below. Just be mindful of return types
     *  For classes where we need pre-save functionality, leave this function and imlement the saveDataBase
     */
    public saveData() {
        this.saveDataObservable().subscribe();
    }

    // Date format
    public formatDate(date: any, format: string, timezone?: string) {
        if (date && !isNaN(date.getTime())) {
            const datePipe = new DatePipe('en');
            return datePipe.transform(date, format, timezone);
        }
        return date;
    }

    

    // utility methods for updating data
    // Some of these should probably be moved to the datamanger class itself
    protected updateData(address: string, data: any) {
        const existingData = this.dataManager.getSync(address);
        const newData = new StatefulData('dirty', data, existingData.originalData);
        this.dataManager.setData(address, newData);
    }
}
/** To prevent code stutter (i.e. basicInfo.getBasicInfo) the crud names should be:
 * .getData()
 * .setData(currentData)
 * .saveData(saveData) or .saveData() <-- could use the current value in the store to save.
 * .updateData(saveData) or .updateData() <-- could use the current value in the store to save.
 */

/**
 * To help with this, the .getData function has been aliased to prevent this.super.getData()
 */
// BaseFormDataService.prototype['postData'] = BaseFormDataService.prototype.constructor['__proto__'].prototype.getData;
