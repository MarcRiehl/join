import { Component, inject } from '@angular/core';

import { ContactService } from '../../services/contacts/contact.service';

@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {
  private contactService = inject(ContactService);

  ngOnInit() {
    this.contactService.getContacts();
  }
}
