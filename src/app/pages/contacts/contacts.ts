import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';

import { Contact as ContactInterface } from '../../interfaces/contacts/contact';
import { ContactService } from '../../services/contacts/contact.service';

@Component({
  selector: 'app-contacts',
  imports: [JsonPipe],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts implements OnInit {
  private contactService = inject(ContactService);

  contacts = signal<ContactInterface[]>([]);

  // 1. Daten vom Service holen.
  // 2. Im Signal speichern.

  async ngOnInit() {
    const contactData = await this.contactService.getContacts(); // Kontakte in einer Variablen speichern
    this.contacts.set(contactData); // Kontakte in das Signal speichern
  }
}

//
// Hole Kontakte vom Service

// ↓

// Speichere sie in einer Variable

// ↓

// Zeige sie im HTML an

// Ein Signal ist einfach ein Speicher für Daten. Angular merkt automatisch, wenn sich der Inhalt ändert.
//  signal<...>() erstellt ein Signal, das einen bestimmten Typ von Daten speichert. In diesem Fall speichern wir ein Array von Kontakten (ContactInterface[]).
//  “Welche Art von Daten wird hier gespeichert?”
// signal<number> -- es werden Zahlen gespeichert
// signal<string> -- es werden Zeichenketten gespeichert
// signal<boolean> -- es werden Wahrheitswerte gespeichert
// signal<ContactInterface[]> -- es werden Kontakte gespeichert

// Die FUnktion braucht einen Startwert, daher []. Das ist ein leeres Array, weil wir noch keine Kontakte haben. Später werden wir die Kontakte vom Service laden und in dieses Signal speichern.
//  signal(0) -- Startwert ist 0
