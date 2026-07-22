import { inject, Injectable, signal } from '@angular/core';
import { RealtimeChannel } from '@supabase/supabase-js';

import { Contact as ContactInterface } from '../../interfaces/contacts/contact';
import { splitFullName } from '../../utils/name.util/name.util';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private supabaseService = inject(SupabaseService);
  contacts = signal<ContactInterface[]>([]);
  selectedContact = signal<ContactInterface | null>(null);
  channels: RealtimeChannel | undefined;

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
      const selectedContact = this.selectedContact();
      if (selectedContact) {
        const updatedSelectedContact = mappedContacts.find(
          (contact) => contact.id === selectedContact.id,
        );

        if (updatedSelectedContact) {
          this.selectedContact.set(updatedSelectedContact);
        }
      }
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

  async contactExists(fullName: string, excludeId?: number): Promise<boolean> {
    const { firstname, lastname } = splitFullName(fullName);

    let query = this.supabaseService.supabase
      .from('user_join')
      .select('id')
      .eq('user_firstname', firstname)
      .eq('user_lastname', lastname);

    if (excludeId !== undefined) {
      query = query.not('id', 'eq', excludeId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error(error);
      return false;
    }

    return !!data;
  }

  async addContact(contact: ContactInterface): Promise<boolean> {
    const { data, error } = await this.supabaseService.supabase
      .from('user_join')
      .insert({
        user_firstname: contact.firstname,
        user_lastname: contact.lastname,
        user_mail: contact.email,
        user_phone: contact.phone,
        auth_user_id: contact.authUserId,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      return false;
    }

    const contacts = await this.loadContacts();
    const newContact = contacts.find((c) => c.id === data.id);

    if (newContact) {
      this.selectedContact.set(newContact);
    }

    return true;
  }

  async updateContact(contact: ContactInterface): Promise<boolean> {
    const { error } = await this.supabaseService.supabase
      .from('user_join')
      .update({
        user_firstname: contact.firstname,
        user_lastname: contact.lastname,
        user_mail: contact.email,
        user_phone: contact.phone,
      })
      .eq('id', contact.id);

    if (error) {
      console.error(error);
      return false;
    }

    await this.loadContacts();
    return true;
  }

  deleteSelectedContact(): void {
    const contact = this.selectedContact();
    if (!contact) return;
    this.contacts.update((contacts) => contacts.filter((c) => c.id !== contact.id));
    this.selectedContact.set(null);
  }

  subscribeToContactChanges() {
    this.channels = this.supabaseService.supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_join' }, (payload) => {
        console.log('Change received!', payload);
        this.loadContacts();
      })
      .subscribe();
  }

  unsubscribeFromContactChanges() {
    if (this.channels) {
      this.supabaseService.supabase.removeChannel(this.channels);
      this.channels = undefined;
    }
  }
}
