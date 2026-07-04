import { inject, Injectable } from '@angular/core';

import { Contact as ContactInterface } from '../../interfaces/contacts/contact';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private supabaseService = inject(SupabaseService);

  async getContacts(): Promise<ContactInterface[]> {
    const { data, error } = await this.supabaseService.supabase.from('user_join').select('*');
    console.log('Contacts:', data);
    console.log('Error:', error);
    if (error) {
      console.log('Contacts could not be loaded');
      return [];
    }
    return data;
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
