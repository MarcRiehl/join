import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-bubble',
  imports: [],
  templateUrl: './user-bubble.html',
  styleUrl: './user-bubble.scss',
})
export class UserBubble {
  initials = input<string>('');
  color = input<string>('');
}
