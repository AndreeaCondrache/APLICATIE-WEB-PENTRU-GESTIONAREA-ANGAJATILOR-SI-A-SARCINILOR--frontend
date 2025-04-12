
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


export const BASE_URL= 'http://localhost:8080/';

@Injectable({
  providedIn: 'root' 
})
export class AdminService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getUsers(): Observable<any>{
    return this.http.get(BASE_URL + 'api/admin/users', {
      headers: this.createAuthorizationHeader()
    });
  }

  postTask(taskDto: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/admin/task', taskDto,{
      headers: this.createAuthorizationHeader()
    });
  }

  getTasks(): Observable<any> {
    return this.http.get(BASE_URL + 'api/admin/tasks',{
         headers:this.createAuthorizationHeader()
  });
}

searchTask(title: string): Observable<any> {
  return this.http.get(BASE_URL + `api/admin/task/search/${title}`,{
    headers: this.createAuthorizationHeader()
  });
}

deleteTask(id: number): Observable<any> {
  return this.http.delete(BASE_URL + `api/admin/task/${id}`,{
    headers: this.createAuthorizationHeader()
  });
}

updatetask(id: number, taskDto: any): Observable<any> {
  return this.http.put(BASE_URL + `api/admin/task/${id}`,taskDto,{
    headers: this.createAuthorizationHeader()
  });
}

getTaskbyId(id: number): Observable<any> {
  return this.http.get(BASE_URL + `api/admin/task/${id}`,{
    headers: this.createAuthorizationHeader()
  });
}

getCommentsByTaskId(id: number): Observable<any> {
  return this.http.get(BASE_URL + `api/admin/task/${id}/comments`,{
    headers: this.createAuthorizationHeader()
  });
}

createComment(taskId: number, content: string): Observable<any> {
  const params = {
    taskId: taskId,
    userId: StorageService.getUserId()
  }
  return this.http.post(BASE_URL + `api/admin/task/comments`, {
    taskId: taskId,
    userId: StorageService.getUserId(),
    content: content
  }, {
    headers: this.createAuthorizationHeader()
  });
  
}
  
private createAuthorizationHeader(): HttpHeaders {
  return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
  );
}

addEmployee(data: any) {
  return this.http.post('http://localhost:8080/api/admin/employee', data);
}


 deleteUser(id: number): Observable<any> {
  return this.http.delete(BASE_URL + `api/admin/user/${id}`, {
    headers: this.createAuthorizationHeader()
  });
}

filterUsers(params: any): Observable<any> {
  let httpParams = new HttpParams();
  Object.keys(params).forEach(key => {
    if (params[key]) {
      httpParams = httpParams.set(key, params[key]);
    }
  });

  return this.http.get(BASE_URL + 'api/admin/users/filter', {
    headers: this.createAuthorizationHeader(),
    params: httpParams
  });
}

updateUser(id: number, data: any): Observable<any> {
  return this.http.put(BASE_URL + `api/admin/user/${id}`, data, {
    headers: this.createAuthorizationHeader()
  });
}


}
 
