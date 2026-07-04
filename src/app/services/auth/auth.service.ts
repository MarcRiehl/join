import { inject, Injectable } from '@angular/core';

import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase = inject(SupabaseService);

  // ----------------------------
  // AUTHENTIFIZIERUNG
  // ----------------------------
  // Benutzer registrieren
  // -> signUp()
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
