import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CpfModalDialogModule } from '../lib/cpf-modaldialog.module';
import { Base } from './features/components/base/base';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CpfModalDialogModule, Base],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('cpf');
}
