import { CanActivateFn, Router } from '@angular/router';
import { Stored_Keys } from '../constants/stored-keys';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  // Guard
  // Services
  // lifecycle hook

  const router = inject(Router);
  const platform = inject(PLATFORM_ID);

  if (isPlatformBrowser(platform)) {
    const token = localStorage.getItem(Stored_Keys.token);

    if (token) {
      return true;
    } else {
      return router.createUrlTree(['/login']);
    }
  } else {
    return true;
  }
};
