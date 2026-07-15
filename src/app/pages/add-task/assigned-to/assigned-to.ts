import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  output,
  computed,
  OnInit,
} from '@angular/core';
import { Contact } from '../../../interfaces/contacts/contact';
import { ContactService } from '../../../services/contacts/contact.service';
import { UserBubble } from '../../../components/user-bubble/user-bubble';

@Component({
  selector: 'app-assigned-to',
  imports: [UserBubble],
  templateUrl: './assigned-to.html',
  styleUrl: './assigned-to.scss',
})
export class AssignedTo implements OnInit {
  private contactService = inject(ContactService);
  private elementRef = inject(ElementRef);

  contacts = this.contactService.contacts;

  // Loads the contact list when the component is created
  ngOnInit(): void {
    this.contactService.loadContacts();
  }

  selectedContacts = signal<Contact[]>([]);
  isDropdownOpen = false;
  selectedContactsChange = output<Contact[]>();
  searchTerm = signal<string>('');

  filteredContacts = computed(() => {
    return this.contacts().filter((contact) =>
      contact.firstname.toLowerCase().includes(this.searchTerm().toLowerCase()),
    );
  });

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Opens the dropdown when the search input is focused/clicked
  openDropdown(): void {
    this.isDropdownOpen = true;
  }

  // Method to check if a contact is selected. It returns true if the contact is present in the selectedContacts signal; otherwise, it returns false.
  isSelected(contact: Contact): boolean {
    return this.selectedContacts().some((c) => c.id === contact.id);
  }
  // Method to toggle the selection of a contact. If the contact is already selected, it removes it from the selectedContacts signal; otherwise, it adds it to the selectedContacts signal.
  toggleContact(contact: Contact): void {
    if (this.isSelected(contact)) {
      this.selectedContacts.update((contacts) => contacts.filter((c) => c.id !== contact.id));
    } else {
      this.selectedContacts.update((contacts) => [...contacts, contact]);
    }
    this.selectedContactsChange.emit(this.selectedContacts());
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  visibleBubbles = computed(() => this.selectedContacts().slice(0, 3));

  remainingCount = computed(() => {
    const total = this.selectedContacts().length;
    return total > 3 ? total - 3 : 0;
  });
}
