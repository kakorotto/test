import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Uses environment configuration
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  testConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test`);
  }

  getHello(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/hello/${name}`);
  }

  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/data`, data);
  }
}

