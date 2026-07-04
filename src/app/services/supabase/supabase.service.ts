import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabaseUrl = 'https://awizaddljgzacbpunfhx.supabase.co';
  supabaseKey = 'sb_publishable_fQtC-jov7Yp1ouBIZaWweg_Ev2AADXG';
  supabase = createClient(this.supabaseUrl, this.supabaseKey);
}

// Verbindung zur Datenbank herstellen
// * URL und API-Key verwalten
// * den Client zur Verfügung stellen
