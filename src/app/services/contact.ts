import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root',
})
export class Contact {
   supabase = createClient(environment.apiUrl, environment.apiKey);
}
