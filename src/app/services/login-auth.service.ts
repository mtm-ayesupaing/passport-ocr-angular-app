import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { StrapiUser, User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  private apiPath = 'login';
  private loginToken = "";
  private apiEndpoint = environment.apiEndpoint;
  private loginUser!: User;

  private currentUserInfo = new BehaviorSubject({});
  public currentUserInfoObservable = this.currentUserInfo.asObservable();

  constructor(
    private http: HttpClient,
    protected router: Router,
  ) {
    this.token = String(localStorage.getItem('token'));
    // this.user = JSON.parse(localStorage.getItem('user')) as User;
  }

  login(email: string, password: string): Promise<any> {
    const loginUrl = this.apiEndpoint + this.apiPath;
    const body = {
      email: email,
      password: password
    };
    return new Promise((resolve, reject) => {
      this.http.post(loginUrl, body).subscribe((data: any) => {
        console.log("HERE", data);
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

  get user(): User {
    return this.loginUser;
  }

  set user(user: User) {
    this.loginUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  public clearAll(): any {
    this.loginToken = "";
    this.token = "";
    // this.loginUser = null;
    // this.user = null;
    localStorage.clear();
  }

}