import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  private apiPath = 'login';
  private loginToken = "";
  private decoded : any;
  private apiEndpoint = environment.apiEndpoint;

  private currentUserInfo = new BehaviorSubject({});
  public currentUserInfoObservable = this.currentUserInfo.asObservable();

  constructor(
    private http: HttpClient,
    protected router: Router,
  ) {
    this.token = String(localStorage.getItem('token'));
  }

  login(email: string, password: string): Promise<any> {
    const loginUrl = this.apiEndpoint + this.apiPath;
    const body = {
      email: email,
      password: password
    };
    return new Promise((resolve, reject) => {
      this.http.post(loginUrl, body).subscribe((data: any) => {
        this.token = data.token;
        this.decoded = jwt_decode(this.token);
        localStorage.setItem("currentUser", this.decoded["email"]);
        resolve(data);
      },
        error => {
          reject(error);
        });
    });
  }

  getUserInfo(data: any): void {
    this.currentUserInfo.next(data);
  }

  public logout(): any {
    this.clearAll();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.token !== 'null' ? true : false;
  }

  get token(): string {
    return this.loginToken;
  }

  set token(tokenStr: string) {
    this.loginToken = tokenStr;
    localStorage.setItem('token', tokenStr);
  }

  public clearAll(): any {
    this.loginToken = "";
    this.token = "";
    localStorage.clear();
  }

}