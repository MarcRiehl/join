import { inject, Injectable } from '@angular/core';

import { Contact } from '../../interfaces/contacts/contact';
import { splitFullName } from '../../utils/name.util/name.util';
import { ContactService } from '../contacts/contact.service';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabaseService = inject(SupabaseService);
  private contactService = inject(ContactService);

  // signInAnonymously() erstellt einen anonymen user

  // Benutzer registrieren
  // with mail and password!

  // -> signUp()
  // es kann eine URL angegeben werden, zu der der Benutzer weitergeleitet werden soll -> Summary!
  // Diese URL muss als Weiterleitungs URL konfiguriert sein.
  // Wenn Sie keine Weiterleitungs-URL angeben, wird der Benutzer automatisch zur URL Ihrer Website weitergeleitet. Standardmäßig ist dies „localhost:3000“, kann konfiguriert werden.

  async signUpNewUser(fullName: string, email: string, password: string): Promise<boolean> {
    const { firstname, lastname } = splitFullName(fullName);
    const exists = await this.contactService.contactExists(fullName);

    if (exists) {
      console.log('Kontakt existiert bereits');
      return false;
    }
    const { data, error } = await this.supabaseService.supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://example.com/welcome', // hier muss die Login URL rein
      },
    });

    if (error) {
      console.log(error); // ERROR MESSAGE
      return false;
    }

    const contactAdded = await this.contactService.addContact({
      firstname: firstname,
      lastname: lastname,
      email: email,
      authUserId: data.user?.id,
    });
    if (!contactAdded) {
      console.log('Kontakt konnte nicht angelegt werden');
      return false;
    }
    return true;
  }

  // ---cut---
  async signInWithEmail() {
    const { data, error } = await this.supabaseService.supabase.auth.signInWithPassword({
      email: 'valid.email@supabase.io',
      password: 'example-password',
    });
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
