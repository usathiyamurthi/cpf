import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnDestroy,
    Output,
    EventEmitter,
    forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FileUpload } from './model/file-upload';
import { SelectedFile } from '../file/model/selected-file';
import { FieldHelperTextComponent } from '../field-helper-text/field-helper-text.component';
import { FileComponent } from '../file/file.component';
import { DragDropDirective } from './drag-drop-directive';
import { FileSelectDirective } from './file-select.directive';

export interface IExtendedFieldConfig {
    label?: string;
    required?: boolean;
    showHelpIcon?: boolean;
    helpIconClass?: string;
    helpKey?: string;
    helpContent?: string;
    showError?: boolean;
    errorText?: string;
    warning?: boolean;
    noteText?: string;
    editable?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    isLarge?: boolean;
    multiselect?: boolean;
    base64Encode?: boolean;
    controlWidth?: string;
    extraProperties?: {
        allowedfiletypes?: string[];
    };
}

@Component({
    selector: 'cpf-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => FileUploadComponent),
        multi: true
    }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FieldHelperTextComponent,
        FileComponent,
        DragDropDirective,
        FileSelectDirective
    ]
})
export class FileUploadComponent implements ControlValueAccessor, OnDestroy {
    fileUploader = new FormControl();
    onDestroy$ = new Subject<void>();
    filetypes = '';
    protected _config: IExtendedFieldConfig = {
        showError: false,
        required: false,
        editable: true,
        disabled: false,
        readonly: false,
        isLarge: false,
        multiselect: true,
        base64Encode: true,
        extraProperties: {
            allowedfiletypes: []
        },
    };
    protected _value: any[] = [];
    private _onChange: (value: any) => void = () => {};
    private _onTouched: () => void = () => {};

    @Input() encode: boolean = true;
    @Input('config')
    public set config(config: IExtendedFieldConfig) {
        if (config) {
            this._config = { ...this._config, ...config };
            const types = config?.extraProperties?.allowedfiletypes;
            this.filetypes = (types && types.length > 0) ? types.join(',') : '';
        }
    }

    public get config(): IExtendedFieldConfig {
        return this._config;
    }

    @Output() remove = new EventEmitter();
    @Output() change = new EventEmitter();

    get value() {
        return this._value;
    }

    set value(v: any) {
        if (v !== this._value) {
            if (!this.config.multiselect && v?.length) {
                v = [v[v.length - 1]];
            }
            this._value = v?.length ? [...v] : [];
            this._onChange(this._value);
            this.change.emit(this._value);
            this.cdr.markForCheck();
        }
    }

    constructor(
        private domSanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef
    ) {}

    writeValue(value: any): void {
        this._value = value?.length ? [...value] : [];
        this.cdr.markForCheck();
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this._config = { ...this._config, disabled: isDisabled };
        this.cdr.markForCheck();
    }

    effectiveControlWidth(width?: string): string {
        return width || '100%';
    }

    showHelpEvt(event: any): void {
        // Hook for help display
    }

    onHelperTextLinkClicked(event: any): void {
        // Hook for helper text link clicks
    }

    uploadedFile(files: File[]) {
        let filesWithMetaData: FileUpload[] = this.value ? this.value : [];
        if (this.config.base64Encode) {
            forkJoin(Array.from(files).map((file: File) => this.getBase64(file))).subscribe(result => {
                if (!this.config.multiselect) {
                    filesWithMetaData = [];
                }
                filesWithMetaData = filesWithMetaData.concat(
                    result.map((item: unknown, index: number) => {
                        const file = files[index];
                        const fileExt = this.getFileExtension(file);
                        return {
                            name: file.name,
                            data: !!this.encode ? String(item).replace(/^data:(.*;base64,)?/, '') : String(item),
                            type: fileExt || '',
                            icon: this.getFileIconClass(file),
                            size: file.size
                        };
                    })
                );
                this.value = filesWithMetaData;
            });
        } else {
            const fileListArray: any[] = this.value ? this.value : [];
            Array.from(files).forEach((file: File) => {
                fileListArray.push(file);
            });
            this.value = [...fileListArray];
        }
    }

    removeFile(index: number) {
        this.remove.emit(this.value[index]);
        this.value = this.value.filter((_: any, i: number) => i !== index);
        this.fileUploader.reset();
    }

    public generateUrlFromBase64Data(base64: any): any {
        return this.domSanitizer.bypassSecurityTrustUrl('data:application/octet-stream;base64,' + base64.data);
    }

    private getFileExtension(file: File | FileUpload): string | null {
        return file ? file.name.split('.').pop() || null : null;
    }

    private getBase64(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            if (!!this.encode) {
                reader.readAsDataURL(file);
            } else {
                reader.readAsText(file);
            }
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    public getFileIconClass(file: File | FileUpload): string {
        if (!!file) {
            const fileExtension = this.getFileExtension(file);
            return fileExtension || '';
        }
        return '';
    }

    handleSelectedFile(payload: SelectedFile, index: number) {
        switch (payload.action) {
            case 'delete': {
                this.removeFile(index);
                break;
            }

            case 'download': {
                const file = this.value.find((f: any) => f.name === payload.name);
                if (file) {
                    if (this.isValidURL(file.data)) {
                        window.open(file.data, '_blank');
                    } else {
                        this.downloadDocuments(file.data, file.name, file.type);
                    }
                }
                break;
            }

            default: {
                const file = this.value.find((f: any) => f.name === payload.name);
                return file;
            }
        }
    }

    processBase64ToBlobURL(fileData: string, fileType?: string): string {
        let byteCharacters: any = window.atob(fileData);
        let byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        let file = new Blob([byteArray], { type: 'application/' + fileType });
        let fileURL = URL.createObjectURL(file);

        return fileURL;
    }

    downloadFile(fileURL: string, fileName?: string) {
        let link = document.createElement('a');
        link.href = fileURL;
        link.download = fileName || 'download';
        link.click();
        setTimeout(function () {
            URL.revokeObjectURL(fileURL);
        }, 100);
    }

    downloadDocuments(fileData: string, fileName?: string, fileExtn?: string) {
        let fileType = '';
        fileType = (fileExtn === 'pdf') ? fileExtn : 'octet-stream';
        const fileURL = this.processBase64ToBlobURL(fileData, fileType);
        this.downloadFile(fileURL, fileName);
    }

    isValidURL(value: string) {
        const res = value.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        );
        return res !== null;
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
