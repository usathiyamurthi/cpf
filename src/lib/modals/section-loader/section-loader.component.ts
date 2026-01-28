import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cpf-section-loader',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './section-loader.component.html',
    styleUrls: ['./section-loader.component.scss']
})
export class SectionLoaderComponent implements OnInit {
    @Input() type: 'generic' | 'form' | 'table' = 'generic';
    constructor() {}
    ngOnInit() {}
}
