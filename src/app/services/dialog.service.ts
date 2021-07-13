import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _updatedUser: any;

  constructor() { }

  set updatedUser(updatedUser: any) {
    this._updatedUser = updatedUser;
  }

  get updatedUser(): any {
    return this._updatedUser;
  }

}
