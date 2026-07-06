import { JsonPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { Contact as ContactInterface } from '../../../interfaces/contacts/contact';

@Component({
  selector: 'app-contact-list',
  imports: [],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  contacts = input<ContactInterface[]>([]);
  contactSelected = output<ContactInterface>();

  selectedContact(contact: ContactInterface) {
    this.contactSelected.emit(contact);
  }
}
