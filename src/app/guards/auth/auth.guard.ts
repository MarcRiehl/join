import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router); // ist ein Service von Angular!
  // Der Router wird benötigt, wenn eine nicht angemeldete Person umgeleitet werden soll!
  //  createUrlTree() beschreibt das Ziel der Umleitung
  //  return router.createUrlTree(['/summary'])

  await authService.getUser();

  if (authService.currentUser()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
