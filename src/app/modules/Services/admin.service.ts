import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AUTH_URL } from '../app-endpoints';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {

  jwtToken: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly apiUrl = AUTH_URL;
  private readonly tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  isAuth(): boolean {
    return Boolean(this.getToken())
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem("authToken");
  }
}
