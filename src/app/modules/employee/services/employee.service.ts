import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  uploadProfilePicture(formData: FormData) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getTaskbyUserId(): Observable<any> {
    return this.http.get(BASE_URL + `api/employee/tasks/${StorageService.getUserId()}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getTaskbyId(id: number): Observable<any> {
    return this.http.get(BASE_URL + `api/employee/task/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCommentsByTaskId(id: number): Observable<any> {
    return this.http.get(BASE_URL + `api/employee/task/${id}/comments`, {
      headers: this.createAuthorizationHeader()
    });
  }

  createComment(taskId: number, content: string): Observable<any> {
    const params = new HttpParams()
      .set('taskId', taskId.toString())  // Ensure taskId is a string
      .set('postedBy', StorageService.getUserId() || '');  // Ensure postedBy is never null

    return this.http.post(BASE_URL + `api/employee/task/comments`, content, {
      params: params,
      headers: this.createAuthorizationHeader()
    });
  }

  updateTask(id: number, status: string): Observable<any> {
    return this.http.get(BASE_URL + `api/employee/task/${id}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    );
  }
  
  testToken(): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + StorageService.getToken());
  
    this.http.get('http://localhost:8080/api/auth/test', { headers }).subscribe({
      next: (res) => console.log('✅ Token valid. Răspuns:', res),
      error: (err) => console.error('❌ Token invalid sau lipsă. Eroare:', err)
    });
  }
  
}
