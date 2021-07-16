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

  searchPassport(param: any): Observable<any> {
    return this.http.get(`${environment.apiEndpoint}searchPassport/${param}`);
  }

  savePassport(body: any): Observable<any> {
    return this.http.post(`${environment.apiEndpoint}savePassport`, body);
  }

  updatePassport(passportNo: string, body: any): Observable<any> {
    return this.http.put(environment.apiEndpoint + `updatePassport/${passportNo}`, body);
  }

  deletePassport(passportNo: string): Observable<any> {
    return this.http.delete(`${environment.apiEndpoint}deletePassport/${passportNo}`);
  }

}
