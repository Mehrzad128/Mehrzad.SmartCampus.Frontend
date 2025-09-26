import { Injectable } from '@angular/core';
import { BackendService } from '../backend-service/backend-service';
import { catchError, Observable, of } from 'rxjs';

export interface TokenValidationResult {
  isOK: boolean;
  role: string | null;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService extends BackendService {

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

    validateToken(): Observable<TokenValidationResult> {
    // HttpInterceptor will attach the Authorization header
    return this.http.get<TokenValidationResult>(this.securityAPI + '/token/validate').pipe(
      catchError(() => of({ isOK: false, role: null }))
    );
  }

  clearToken() {
    sessionStorage.removeItem('token');
  }

}
