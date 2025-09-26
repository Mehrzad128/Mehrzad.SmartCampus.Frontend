import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../+services/notification-service/notification-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notify: NotificationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let message = 'An error occurred.';
        if (err.status === 400 && err.error?.details) {
          message = Object.values(err.error.details).flat().join(', ');
        } else if (err.error?.error) {
          message = err.error.error;
        } else if (err.status === 500) {
          message = 'Server error. Please try again later.';
        }
        this.notify.showError(message);
        return throwError(() => err);
      })
    );
  }
}