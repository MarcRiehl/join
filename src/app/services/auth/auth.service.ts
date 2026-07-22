import { inject, Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

import { splitFullName } from '../../utils/name.util/name.util';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseService = inject(SupabaseService);

  // ----------------------------
  // AUTHENTIFIZIERUNG
  // ----------------------------

  // Welche Parameter sind zwingend notwendig, damit ein Account überhaupt angelegt werden kann?

  // signInAnonymously() erstellt einen anonymen user

  // Benutzer registrieren
  // with mail and password!

  // -> signUp()
  // es kann eine URL angegeben werden, zu der der Benutzer weitergeleitet werden soll -> Summary!
  // Diese URL muss als Weiterleitungs URL konfiguriert sein.
  // Wenn Sie keine Weiterleitungs-URL angeben, wird der Benutzer automatisch zur URL Ihrer Website weitergeleitet. Standardmäßig ist dies „localhost:3000“, kann konfiguriert werden.



const supabase = createClient('https://your-project-id.supabase.co', 'sb_publishable_...')

async function signUpNewUser() {
  const { data, error } = await this.supabase.auth.signUp({
    email: 'valid.email@supabase.io',
    password: 'example-password',
    options: {
      emailRedirectTo: 'https://example.com/welcome',
    },
  })

  // contactExists()
  // prüfen, ob der Kontakt bereits existiert, dann signUp()
}


// ---cut---
async function signInWithEmail() {
  const { data, error } = await this.supabase.SupabaseService.auth.signInWithPassword({
    email: 'valid.email@supabase.io',
    password: 'example-password',
  })
}


  // Benutzer anmelden
  // -> signInWithPassword()
  // Benutzer abmelden
  // -> signOut()
  // Aktuell eingeloggten Benutzer laden
  // -> getUser()
  // Session abrufen
  // -> getSession()
  // Passwort zurücksetzen
  // -> resetPassword()
  // Passwort ändern
  // -> updateUser()
  // Prüfen, ob ein Benutzer eingeloggt ist
  // Auth-Status beobachten
  // Benutzer anmelden
  // -> signInWithPassword()
  // Benutzer abmelden
  // -> signOut()
  // Aktuell eingeloggten Benutzer laden
  // -> getUser()
  // Session abrufen
  // -> getSession()
  // Passwort zurücksetzen
  // -> resetPassword()
  // Passwort ändern
  // -> updateUser()
  // Prüfen, ob ein Benutzer eingeloggt ist
  // Auth-Status beobachten
}
