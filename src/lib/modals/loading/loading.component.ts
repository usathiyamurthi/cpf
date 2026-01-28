import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'cpf-loading',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoadingComponent {
    public msg: string = 'Loading...';

    constructor() { }
}
