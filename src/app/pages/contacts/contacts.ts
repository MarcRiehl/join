import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { Contact as ContactInterface } from '../../interfaces/contacts/contact';
import { ContactService } from '../../services/contacts/contact.service';
import { ContactDetails } from './contact-details/contact-details';
import { ContactList } from './contact-list/contact-list';

@Component({
  selector: 'app-contacts',
  imports: [ContactList, ContactDetails],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts implements OnInit {
  private contactService = inject(ContactService);

  contacts = signal<ContactInterface[]>([]);
  selectedContact = signal<ContactInterface | null>(null);

  async ngOnInit() {
    const contactData = await this.contactService.getContacts();
    this.contacts.set(contactData);
  }

  selectContact(contact: ContactInterface) {
    this.selectedContact.set(contact);
  }

  clearSelectedContact() {
    this.selectedContact.set(null);
  }
}
