import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  private authService = inject(AuthService);
  private router = inject(Router);

  // for Log-In Button:

  async onSubmit(email: string, password: string): Promise<void> {
    const loginSuccessful = await this.authService.signIn(email, password);

    if (loginSuccessful) {
      await this.router.navigate(['/summary']);
    }
  }
}
