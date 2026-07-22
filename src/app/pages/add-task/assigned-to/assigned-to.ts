import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  output,
  computed,
  OnInit,
  input,
  effect,
  ViewChild
} from '@angular/core';
import { Contact } from '../../../interfaces/contacts/contact';
import { ContactService } from '../../../services/contacts/contact.service';
import { UserBubble } from '../../../components/user-bubble/user-bubble';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-assigned-to',
  imports: [UserBubble, OverlayModule],
  templateUrl: './assigned-to.html',
  styleUrl: './assigned-to.scss',
})
export class AssignedTo implements OnInit {
  private contactService = inject(ContactService);
  private elementRef = inject(ElementRef);
  preselectedIds = input<number[]>([]);

  contacts = this.contactService.contacts;
  private initialized = false;

  constructor() {
    // effect(() => {
    //   const ids = this.preselectedIds();
    //   const contacts = this.contacts();

    //   if (!ids.length || !contacts.length) {
    //     return;
    //   }

    //   this.selectedContacts.set(
    //     contacts.filter(contact => ids.includes(contact.id!))
    //   );
    // });
    effect(() => {
      if (this.initialized) {
        return;
      }

      const ids = this.preselectedIds();
      const contacts = this.contacts();

      // Warten bis die Kontakte geladen sind
      if (!contacts.length) {
        return;
      }

      const selected = contacts.filter(contact =>
        ids.includes(contact.id!)
      );

      this.selectedContacts.set(selected);

      // Parent (AddTask) über den Initialzustand informieren
      this.selectedContactsChange.emit(selected);

      this.initialized = true;
    });
  }

  // Loads the contact list when the component is created
  ngOnInit(): void {
    this.contactService.loadContacts();
  }

  selectedContacts = signal<Contact[]>([]);
  isDropdownOpen = false;
  selectedContactsChange = output<Contact[]>();
  searchTerm = signal<string>('');

  filteredContacts = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.contacts().filter(
      (contact) =>
        contact.firstname.toLowerCase().includes(term) ||
        contact.lastname.toLowerCase().includes(term),
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
    if (this.isDropdownOpen) return;

    setTimeout(() => {
      this.isDropdownOpen = true;
    });
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

  clear(): void {
    this.selectedContacts.set([]);
    this.searchTerm.set('');
    this.isDropdownOpen = false;

    this.selectedContactsChange.emit([]);
      this.initialized = false;
  }
}
