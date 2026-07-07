import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../services/contacts/contact.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private contactService = inject(ContactService);

selectedContact = this.contactService.selectedContact;

  menuOpen = false;

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.closeMenu();
  }
}

