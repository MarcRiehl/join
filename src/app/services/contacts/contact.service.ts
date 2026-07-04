import { inject, Injectable } from '@angular/core';

import { Contact as ContactInterface } from '../../interfaces/contacts/contact';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private supabase = inject(SupabaseService);

  async getContacts() {
    let { data, error } = await this.supabase.from('user_join').select('*');
    console.log('Contacs:', data);
    console.log('Error:', error);
  }
}

// Aufgaben des ContactService
//  Kontakte laden
// ├── Kontakt erstellen
// ├── Kontakt bearbeiten
// └── Kontakt löschen
