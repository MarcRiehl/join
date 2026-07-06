import { JsonPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { Contact as ContactInterface } from '../../../interfaces/contacts/contact';

@Component({
  selector: 'app-contact-list',
  imports: [],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})

// Die ContactList bekommt die Kontakte vom Parent über ein Input.
export class ContactList {
  contacts = input<ContactInterface[]>([]);
  contactSelected = output<ContactInterface>(); // “Ich habe einen Ausgang (Output), über den ich später einen ContactInterface an meinen Parent schicken kann.”

  selectedContact(contact: ContactInterface) {
    this.contactSelected.emit(contact);
  }
}

//  emit() bedeutet: “Schicke diesen Kontakt an den Parent.”
// * selectContact() = Methode wird beim Klick ausgeführt
// * contactSelected = Event wird an Parent gesendet
