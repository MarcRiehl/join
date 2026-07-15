import { Component, inject, output, signal } from '@angular/core';

import { Contact } from '../../../interfaces/contacts/contact';
import { ContactService } from '../../../services/contacts/contact.service';

@Component({
  selector: 'app-assigned-to',
  imports: [],
  templateUrl: './assigned-to.html',
  styleUrl: './assigned-to.scss',
})
export class AssignedTo {
  private contactService = inject(ContactService);
  contacts = this.contactService.contacts;

  assignedContactIdsChange = output<number[]>();
  selectedContacts = signal<Contact[]>([]);
  isDropdownOpen = false;
  // Method to toggle the state of the dropdown (open or closed)
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  // Method to check if a contact is selected. It checks if the contact's ID exists in the selectedContacts signal.
  isSelected(contact: Contact): boolean {
    return this.selectedContacts().some((c) => c.id === contact.id);
  }
  // Method to toggle the selection of a contact. If the contact is already selected, it removes it from the selectedContacts signal; otherwise, it adds it to the selectedContacts signal.
  toggleContact(contact: Contact): void {
    if (this.isSelected(contact)) {
      this.selectedContacts.update((contacts) => contacts.filter((c) => c.id !== contact.id));
    } else {
      this.selectedContacts.update((contacts) => [...contacts, contact]);
    }
    const selectedIds = this.selectedContacts().map((contact) => contact.id);
    this.assignedContactIdsChange.emit(selectedIds);
  }
}
