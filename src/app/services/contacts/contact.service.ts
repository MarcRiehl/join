import { inject, Injectable, signal } from '@angular/core';
import { Contact as ContactInterface } from '../../interfaces/contacts/contact';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private supabaseService = inject(SupabaseService);
  contacts = signal<ContactInterface[]>([]);

  async loadContacts(): Promise<void> {
    const { data, error } = await this.supabaseService.supabase
      .from('user_join')
      .select('*')
      .order('user_firstname', { ascending: true });

    if (!error && data) {
      this.contacts.set(data as ContactInterface[]);
    }
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
