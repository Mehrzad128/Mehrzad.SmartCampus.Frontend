import { Injectable } from '@angular/core';
import { BackendService } from '../backend-service/backend-service';
import { Observable } from 'rxjs';


export interface LoginResponse {
  token?: string;
  role?: string;
  requiresMfa?: boolean;
  message?: string;
  isOK?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService extends BackendService {
    login(email: string, password: string): Observable<LoginResponse> {
    return this.mypost<LoginResponse>(this.securityAPI+'/login', { email, password });
  }

  verifyMfa(email: string, otp: string): Observable<LoginResponse> {
    return this.mypost<LoginResponse>(this.securityAPI+'/verify-mfa', { email, otp });
  }
}
