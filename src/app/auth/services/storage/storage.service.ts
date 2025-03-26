import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user && user.role ? user.role : '';  // Verifică dacă user-ul și rolul există
  }

  static isAdminLoggedIn(): boolean {
    if(this.getToken()==null)
      return false;
    const role: string = this.getUserRole();
    return this.getUserRole() === "ADMIN";
  }

  static isEmployeeLoggedIn(): boolean {
    if(this.getToken() === null)
      return false;
    const role: string = this.getUserRole();
    return role === "EMPLOYEE";
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.id : '';
  } 

  static hasToken(): boolean {
    if(this.getToken() === null)
      return false; 
    return true; }

  static signout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }


}
