import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  private authService = inject(AuthService);
  private router = inject(Router);

  addLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  // for Log-In Button:

  async onSubmit(email: string, password: string): Promise<void> {
    const loginSuccessful = await this.authService.signIn(email, password);

    if (loginSuccessful) {
      await this.router.navigate(['/summary']);
    }
  }
}
