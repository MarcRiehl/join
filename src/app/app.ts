import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './layout/toast/toast/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('join');
  protected readonly showSplash = signal(true);

  onSplashAnimationEnd(event: AnimationEvent): void {
    this.showSplash.set(false);
  }
}
