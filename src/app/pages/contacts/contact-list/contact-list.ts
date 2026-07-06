import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact as ContactInterface } from '../../../interfaces/contacts/contact';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  contacts = input<ContactInterface[]>([]);
  contactSelected = output<ContactInterface>();
  activeContactId: number | null = null;

  get groupedContacts(): { letter: string; contacts: ContactInterface[] }[] {
    const sorted = [...this.contacts()].sort((a, b) => {
      const nameA = `${a.user_firstname || ''} ${a.user_lastname || ''}`.trim();
      const nameB = `${b.user_firstname || ''} ${b.user_lastname || ''}`.trim();
      return nameA.localeCompare(nameB);
    });

    const groups: { [key: string]: ContactInterface[] } = {};
    for (const contact of sorted) {
      if (!contact.user_firstname) continue;
      const firstLetter = contact.user_firstname.charAt(0).toUpperCase();
      if (!groups[firstLetter]) groups[firstLetter] = [];
      groups[firstLetter].push(contact);
    }

    return Object.keys(groups).sort().map((letter) => ({
      letter,
      contacts: groups[letter],
    }));
  }

  onSelectContact(contact: ContactInterface): void {
    if (contact.id !== undefined) {
      this.activeContactId = contact.id;
    }
    this.contactSelected.emit(contact);
  }
}