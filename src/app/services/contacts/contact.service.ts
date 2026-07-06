import { inject, Injectable } from '@angular/core';

import { Contact as ContactInterface } from '../../interfaces/contacts/contact';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private supabaseService = inject(SupabaseService);

  async getContacts(): Promise<ContactInterface[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('user_join')
      .select('*')
      .order('user_lastname');
    console.log('Contacts:', data);
    console.log('Error:', error);
    if (error) {
      throw error;
    }
    return data.map((contact) => ({
      id: contact.id,
      firstname: contact.user_firstname,
      lastname: contact.user_lastname,
      email: contact.user_mail,
      phone: contact.user_phone,
      initials: this.getInitials(contact.user_firstname, contact.user_lastname),
    }));
  }

  getInitials(firstName: string, lastName: string) {
    const firstLetter = firstName[0].toUpperCase();
    const secondLetter = lastName[0].toUpperCase();

    return firstLetter + secondLetter;
  }
}

// Aufgaben des ContactService
//  Kontakte laden
// ├── Kontakt erstellen
// ├── Kontakt bearbeiten
// └── Kontakt löschen

// allgemeine Syntax für die Kommunikation mit Supabase
//  async functionName(): Promise<Rückgabetyp> {

// ...

// return etwas;

// }
