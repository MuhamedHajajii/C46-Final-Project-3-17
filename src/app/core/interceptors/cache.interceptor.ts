import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

const cache = new Map<string, { response: HttpResponse<any>; expiry: number }>();
const CACHE_DURATION = 2 * 60 * 10000; // 10 minutes
const skipCaching = [''];

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') return next(req);
  if (req.url.includes('cart')) return next(req);
  if (req.url.includes('orders')) return next(req);

  const cacheKey = req.urlWithParams;
  const cached = cache.get(cacheKey);
  console.log(cacheKey);
  console.log(cached);

  if (cached && cached.expiry > Date.now()) {
    return of(cached.response.clone());
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(cacheKey, {
          response: event.clone(),
          expiry: Date.now() + CACHE_DURATION,
        });
      }
    }),
  );
};
