import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Directive({
    selector: '[cpfDragDrop]',
    standalone: true
})
export class DragDropDirective {

    @Output() fileDropped = new EventEmitter<any>();

    constructor() { }

    @Input() draggable: boolean = false;

    @HostListener('drop', ['$event'])
    public ondrop(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        if (this.draggable && evt.dataTransfer) {
            const { files } = evt.dataTransfer;
            if (files.length > 0) {
                this.fileDropped.emit(files);
            }
        }
    }

    @HostListener('dragover', ['$event'])
    public onDragOver(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(evt: any) {
        evt.preventDefault();
        evt.stopPropagation();
    }

}
