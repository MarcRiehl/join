import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

import { Contact as ContactInterface } from '../../interfaces/contacts/contact';

@Injectable({
  providedIn: 'root',
})
export class Contact {
  supabaseUrl = 'https://awizaddljgzacbpunfhx.supabase.co/rest/v1/';
  supabaseKey = 'sb_publishable_fQtC-jov7Yp1ouBIZaWweg_Ev2AADXG';
  supabase = createClient(this.supabaseUrl, this.supabaseKey);
}
