import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      toaster.error(error.error.message);

      return throwError(() => error);
    }),
  );
};
