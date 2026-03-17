import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Stored_Keys } from '../constants/stored-keys';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platform = inject(PLATFORM_ID);

  if (isPlatformBrowser(platform)) {
    const token = localStorage.getItem(Stored_Keys.token);

    if (token) {
      return router.createUrlTree(['/']);
    } else {
      return true;
    }
  } else {
    return true;
  }
};
