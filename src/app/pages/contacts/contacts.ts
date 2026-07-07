import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactList } from './contact-list/contact-list';
import { ContactDetails } from './contact-details/contact-details';
import { ContactService } from '../../services/contacts/contact.service';
import { Contact } from '../../interfaces/contacts/contact';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactList, ContactDetails],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss'
})
export class Contacts implements OnInit {
  private contactService = inject(ContactService);
  contacts = this.contactService.contacts;
  // selectedContact = signal<Contact | null>(null);
  selectedContact = this.contactService.selectedContact;

  ngOnInit(): void {
    this.contactService.loadContacts();
  }

  // selectContact(contact: Contact): void {
  //   this.selectedContact.set(contact);
  // }

  selectContact(contact: Contact): void {
  this.contactService.selectedContact.set(contact);
}

  // clearSelectedContact(): void {
  //   this.selectedContact.set(null);
  // }
  
  clearSelectedContact(): void {
  this.contactService.selectedContact.set(null);
}

}


