import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassportService {

  constructor(
    private http: HttpClient,
  ) { }

  getPassportList(sort: string = 'passport_no'): Observable<any> {
    return this.http.get(environment.apiEndpoint
      + `passports?`
      + `_sort=${sort}:DESC`
    );
  }

  savePassport(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}savePassport`, body);
  }

  updatePassport(id: number, body: any): Observable<any> {
    return this.http.put(environment.apiEndpoint + `updatePassport/${id}`, body);
  }

  deletePassport(id: number): Observable<any> {
    return this.http.delete(`${environment.apiEndpoint}deletePassport/${id}`);
  }

}
