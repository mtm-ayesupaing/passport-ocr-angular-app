import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  getUserList(sort: string = 'user_id'): Observable<any> {
    return this.http.get(environment.apiEndpoint
      + `users?`
      + `_sort=${sort}:DESC`
    );
  }

  addUser(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}add`, body);
  }

  updateUser(id: number, body: any): Observable<any> {
    return this.http.put(environment.apiEndpoint + `update/${id}`, body);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.apiEndpoint}delete/${id}`);
  }

  uploadImage(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}upload`, body);
  }

  searchUser(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}searchUser`, body);
  }

}
