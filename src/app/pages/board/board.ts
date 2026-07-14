import { Component, inject } from '@angular/core';
import { Contact as ContactInterface } from '../../interfaces/contacts/contact';
import { DialogService, DialogType } from '../../services/dialog/dialog.service';
import { ContactService } from '../../services/contacts/contact.service';
import { TaskDialog } from './task-dialog/task-dialog';

@Component({
  selector: 'app-board',
  imports: [TaskDialog],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {

  readonly contactService = inject(ContactService);
  readonly dialogService = inject(DialogService);
  selectedContact = this.contactService.selectedContact;
  readonly DialogType = DialogType;
  // this.contactService.selectedContact.set(null);
  openDialog(): void {

    this.dialogService.open(DialogType.AddTask);
  }
}
