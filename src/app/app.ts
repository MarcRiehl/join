import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogHost } from './layout/dialog-host/dialog-host';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DialogHost],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('join');
}
