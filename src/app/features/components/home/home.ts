import { Component } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';
import { SpeedometerComponent } from '../../../../shared/components/speedometer/speedometer';

@Component({
  selector: 'app-home',
  imports: [Header, SpeedometerComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
