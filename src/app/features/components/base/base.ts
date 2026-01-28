import { Component } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [Header],
  templateUrl: './base.html',
  styleUrls: ['./base.scss'],
})
export class Base {

}
