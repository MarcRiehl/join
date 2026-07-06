import { Component, input, output } from '@angular/core';

import { Contact as ContactInterface } from '../../../interfaces/contacts/contact';

@Component({
  selector: 'app-contact-details',
  imports: [],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})
export class ContactDetails {
  contact = input<ContactInterface | null>(null);

  removeSelectedContact = output<void>();

  onRemoveSelectedContact() {
    this.removeSelectedContact.emit();
  }

  // button -> (click)="onRemoveSelectedcontact()"
}
