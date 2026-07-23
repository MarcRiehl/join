import { inject, Injectable, signal } from '@angular/core';

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
  isLoggedIn = signal<boolean>(false);

  // signInAnonymously() erstellt einen anonymen user

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

  /**
   * Signs in a user with email and password via Supabase.
   * Sets the `isLoggedIn` signal to true on successful login.
   *
   * @param email - The user's email address
   * @param password - The user's password
   * @returns true if login was successful, false if credentials were invalid
   */
  async signIn(email: string, password: string): Promise<boolean> {
    const { error } = await this.supabaseService.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error.message);
      return false;
    }

    this.isLoggedIn.set(true);
    return true;
  }

  /**
   * Signs out the currently logged-in user via Supabase.
   * Sets the `isLoggedIn` signal to false on successful sign-out.
   *
   * @returns true if sign-out was successful, false otherwise
   */
  async signOut(): Promise<boolean> {
    const { error } = await this.supabaseService.supabase.auth.signOut();

    if (error) {
      console.log(error.message);
      return false;
    }

    this.isLoggedIn.set(false);
    return true;
  }

  // Aktuell eingeloggten Benutzer laden
  // -> getUser()

  //  Danach PR -- und Auth Guard machen

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
