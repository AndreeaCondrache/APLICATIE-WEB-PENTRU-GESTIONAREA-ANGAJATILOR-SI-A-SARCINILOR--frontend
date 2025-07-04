import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(loginDTO: any): Observable<any>{
    return this.http.post(BASIC_URL + "api/auth/login", loginDTO);
  }

  signup(signupDTO: any): Observable<any>{
    return this.http.post(BASIC_URL + "api/auth/signup", signupDTO);
  }

}
