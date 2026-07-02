import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root',
})
  export class TestService {
    supabase = createClient(environment.apiUrl, environment.apiKey);
  }
