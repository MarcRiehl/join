import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact as ContactInterface } from '../../../interfaces/contacts/contact';
import { ContactDialog } from '../contact-dialog/contact-dialog/contact-dialog';
import { DialogService, DialogType } from '../../../services/dialog/dialog.service';
import { ContactService } from '../../../services/contacts/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactDialog],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  contacts = input<ContactInterface[]>([]);
  contactSelected = output<ContactInterface>();
  activeContactId: number | null = null;

  get groupedContacts(): { letter: string; contacts: ContactInterface[] }[] {
    const sorted = [...this.contacts()].sort((a, b) => {
      const nameA = `${a.firstname || ''} ${a.lastname || ''}`.trim();
      const nameB = `${b.firstname || ''} ${b.lastname || ''}`.trim();
      return nameA.localeCompare(nameB);
    });

    const groups: { [key: string]: ContactInterface[] } = {};
    for (const contact of sorted) {
      if (!contact.firstname) continue;
      const firstLetter = contact.firstname.charAt(0).toUpperCase();
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


  readonly dialogService = inject(DialogService);
  readonly DialogType = DialogType;
  readonly contactService = inject(ContactService);

  openDialog(): void {
    this.contactService.selectedContact.set(null);
    this.dialogService.open(DialogType.Contact);
  }

}
