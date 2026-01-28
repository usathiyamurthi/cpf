import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedFile } from './model/selected-file';

export interface FileDescriptor {
    name: string;
    icon: string;
    url: string;
    type: string;
    isEditable: boolean;
    lastUpdated: { by: string; date: string };
}

export function makeFileDescriptor(fd?: FileDescriptor): FileDescriptor {
    if (!!fd) {
        return { ...fd };
    }

    return {
        name: '',
        icon: '',
        url: '',
        type: '',
        isEditable: true,
        lastUpdated: {
            by: '',
            date: ''
        }
    };
}

@Component({
    selector: 'cpf-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class FileComponent implements OnInit {
    @Input() descriptor!: FileDescriptor;
    @Output() fileSelected: EventEmitter<SelectedFile> = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
