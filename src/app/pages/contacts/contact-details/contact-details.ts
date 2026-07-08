import { Component, input, output, inject } from '@angular/core';

import { Contact as ContactInterface } from '../../../interfaces/contacts/contact';

import { DialogService, DialogType } from '../../../services/dialog/dialog.service';
import { ContactService } from '../../../services/contacts/contact.service';

@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})
export class ContactDetails {
  contact = input<ContactInterface | null>(null);

  removeSelectedContact = output<void>();

  readonly dialogService = inject(DialogService);
  readonly contactService = inject(ContactService);
  readonly DialogType = DialogType;

  isContactOptionsOpen = false;

  toggleContactOptions(): void {
    this.isContactOptionsOpen = !this.isContactOptionsOpen;
  }

  closeContactOptions(): void {
    this.isContactOptionsOpen = false;
  }

  onRemoveSelectedContact(): void {
    this.closeContactOptions();
    this.removeSelectedContact.emit();
  }

  editContact(): void {
    const contact = this.contact();

    if (!contact) {
      return;
    }

    this.closeContactOptions();
    this.contactService.selectedContact.set(contact);
    this.dialogService.open(DialogType.Contact);
  }
}
