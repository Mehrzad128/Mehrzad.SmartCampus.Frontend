import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  securityAPI = 'https://localhost:7184' ;
  http = inject(HttpClient);
  
  mypost<T>(url: string, data: object) {
    return this.http.post<T>(url, data);
  }
}
