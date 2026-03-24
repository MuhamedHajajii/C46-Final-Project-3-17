import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, timer } from 'rxjs';
import { API_Version } from '../constants/api-versions';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  let loadingSpinner = '';

  console.log(req.context.get(API_Version));
  console.log(req.url);

  if (req.url.includes('cart')) {
    loadingSpinner = 'ball-atom';
  } else {
    loadingSpinner = 'square-jelly-box';
  }

  spinner.show(loadingSpinner);

  return next(req).pipe(
    finalize(() => {
      timer(500).subscribe(() => spinner.hide(loadingSpinner));
    }),
  );
};
