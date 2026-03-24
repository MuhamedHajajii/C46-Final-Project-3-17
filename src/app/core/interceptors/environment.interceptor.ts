import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const environmentInterceptor: HttpInterceptorFn = (req, next) => {
  // baseUrl
  console.log(environment.baseUrl);
  console.log(req.url);
  console.log(environment.appUrl);
  return next(
    req.clone({
      url: `${environment.baseUrl}${req.url}`,
    }),
  );
};
