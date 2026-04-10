import { isPlatformBrowser } from "@angular/common";
import { HttpInterceptorFn } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, throwError } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const toastrService = inject(ToastrService);
  const platformId = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((err) => {

      let errorMessage = 'Something went wrong';
      if (isPlatformBrowser(platformId)) {
        if (err.error?.message && typeof err.error.message === 'string') {
          errorMessage = err.error.message;
        }
        else if (err.error?.errors?.msg) {
          errorMessage = err.error.errors.msg;
        }
        else if (err.message) {
          errorMessage = err.message;
        }

      } else {
        errorMessage = 'An error occurred on the server.';
      }
      toastrService.error(errorMessage, 'Error', {
        positionClass: 'toast-top-right',
        closeButton: true,
        progressBar: true,
      });
      return throwError(() => errorMessage);
    })

  );

};