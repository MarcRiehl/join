import { inject, Injectable, signal } from '@angular/core';
import { Contact as ContactInterface } from '../../interfaces/contacts/contact';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private supabaseService = inject(SupabaseService);
  contacts = signal<ContactInterface[]>([]);
  private bubbleColors = [
    '#FF7A00',
    '#FF5EB3',
    '#6E52FF',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FFA35E',
    '#FC71FF',
    '#FFC702',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
    '#FF4646',
    '#FFBB2B',
  ];

  async loadContacts(): Promise<ContactInterface[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('user_join')
      .select('*')
      .order('user_firstname', { ascending: true });

    if (!error && data) {
      const mappedContacts: ContactInterface[] = data.map((contact: any) => ({
        id: contact.id,
        firstname: contact.user_firstname,
        lastname: contact.user_lastname,
        email: contact.user_mail,
        phone: contact.user_phone,
        initials: this.getInitials(contact.user_firstname, contact.user_lastname),
        colors: this.getBubbleColors(contact.id || 0),
      }));
      this.contacts.set(mappedContacts);
      return mappedContacts;
    }
    return [];
  }

  async getContacts(): Promise<ContactInterface[]> {
    return this.loadContacts();
  }

  getInitials(firstName?: string, lastName?: string): string {
    const firstLetter = firstName && firstName[0] ? firstName[0].toUpperCase() : '';
    const secondLetter = lastName && lastName[0] ? lastName[0].toUpperCase() : '';
    return firstLetter + secondLetter;
  }

  getBubbleColors(id: number): string {
    const index = id % this.bubbleColors.length;
    return this.bubbleColors[index];
  }
}
