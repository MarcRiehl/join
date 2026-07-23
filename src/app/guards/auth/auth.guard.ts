import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // hier musst du jetzt selbst überlegen:
  // 1. getUser() aufrufen und warten
  // 2. danach isLoggedIn() (oder currentUser()) prüfen
  // 3. bei true → true zurückgeben
  // 4. bei false → router.createUrlTree(['/login']) zurückgeben

  return true;
};
