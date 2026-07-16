import { Component, inject, OnInit } from '@angular/core';

import { ContactService } from '../../../../services/contacts/contact.service';

@Component({
  selector: 'app-task-dialog',
  imports: [],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.scss',
})
export class TaskDialog {
  contactService = inject(ContactService);

  selectedContactIds: number[] = [];

  ngOnInit(): void {
    this.contactService.loadContacts();
  }

  toggleContact(contactId: number): void {
    const isSelected = this.selectedContactIds.includes(contactId);

    if (isSelected) {
      this.selectedContactIds = this.selectedContactIds.filter((id) => id !== contactId);
    } else {
      this.selectedContactIds = [...this.selectedContactIds, contactId];
    }
  }
  isContactSelected(contactId: number): boolean {
    return this.selectedContactIds.includes(contactId);
  }
}
