import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message = signal('');
  visible = signal(false);

  private hideTimer?: ReturnType<typeof setTimeout>;

  success(message: string) {
    this.message.set(message);
    this.visible.set(true);

    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this.hideTimer = setTimeout(() => {
      this.visible.set(false);
    }, 800);
  }
}