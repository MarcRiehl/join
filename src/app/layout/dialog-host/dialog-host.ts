import {
  Component,
  HostListener,
  effect,
  inject,
  signal
} from '@angular/core';

import { DialogService, DialogType } from '../../services/dialog/dialog.service';
import { NewUserDialog } from '../../pages/contacts/contact-list/new-user-dialog/new-user-dialog';
import { EditUserDialog } from '../../pages/contacts/contact-details/edit-user-dialog/edit-user-dialog';

@Component({
  selector: 'app-dialog-host',
  imports: [
    NewUserDialog,
    EditUserDialog
  ],
  templateUrl: './dialog-host.html',
  styleUrl: './dialog-host.scss'
})
export class DialogHost {

  readonly dialog = inject(DialogService);

  readonly DialogType = DialogType;

  readonly closing = signal(false);

  constructor() {

    effect(() => {

      if (this.dialog.closing()) {
        this.closing.set(true);
      }

    });

  }

  close() {
    this.dialog.requestClose();
  }

  animationFinished() {

    if (!this.closing()) return;

    this.dialog.finishClose();

    this.closing.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape() {

    if (this.dialog.current().type !== null) {
      this.close();
    }

  }

}