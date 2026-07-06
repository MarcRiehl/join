import { inject, Injectable } from '@angular/core';

import { Contact as ContactInterface } from '../../interfaces/contacts/contact';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private supabaseService = inject(SupabaseService);
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

  async getContacts(): Promise<ContactInterface[]> {
    const { data, error } = await this.supabaseService.supabase
      .from('user_join')
      .select('*')
      .order('user_lastname');
    console.log('Contacts:', data);
    console.log('Error:', error);
    if (error) {
      throw error;
    }
    return data.map((contact) => ({
      id: contact.id,
      firstname: contact.user_firstname,
      lastname: contact.user_lastname,
      email: contact.user_mail,
      phone: contact.user_phone,
      initials: this.getInitials(contact.user_firstname, contact.user_lastname),
      colors: this.getBubbleColors(contact.id),
    }));
  }

  getInitials(firstName: string, lastName: string) {
    const firstLetter = firstName[0].toUpperCase();
    const secondLetter = lastName[0].toUpperCase();

    return firstLetter + secondLetter;
  }

  getBubbleColors(id: number) {
    const index = id % this.bubbleColors.length;
    return this.bubbleColors[index];
  }
}
