import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private _updatedUser: any;
  private _isEditUser: boolean = false;

  constructor() { }

  set updatedUser(updatedUser: any) {
    this._updatedUser = updatedUser;
  }

  get updatedUser(): any {
    return this._updatedUser;
  }

  set isEditUser(editUser: boolean) {
    this._isEditUser = editUser;
  }

  get isEditUser(): boolean {
    return this._isEditUser;
  }

}
