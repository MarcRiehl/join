import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
}

// Verbindung zur Datenbank herstellen
// * URL und API-Key verwalten
// * den Client zur Verfügung stellen
