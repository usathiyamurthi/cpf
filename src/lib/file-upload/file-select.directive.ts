import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[cpfFileSelect]',
    standalone: true
})
export class FileSelectDirective {

    @Output() fileSelected = new EventEmitter<any>();

    protected element: ElementRef;

    constructor(element: ElementRef) {
        this.element = element;
    }

    @HostListener('change')
    public onChange(): any {
        const files = this.element.nativeElement.files;
        if (files.length > 0) {
            this.fileSelected.emit(files);
        }
    }
}
