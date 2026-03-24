import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Stored_Keys } from '../constants/stored-keys';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // token => backend
  // browser
  if (!(req.url.includes('cart') || req.url.includes('orders'))) return next(req);

  const platform = inject(PLATFORM_ID);

  if (isPlatformBrowser(platform)) {
    const token = localStorage.getItem(Stored_Keys.token);

    if (token) {
      return next(
        req.clone({
          setHeaders: {
            token: token!,
          },
        }),
      );
    }
  }

  return next(req);
};
