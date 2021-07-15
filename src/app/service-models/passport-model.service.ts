import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassportModelService {
  private _passportData: any;
  constructor() { }

  set passportData(passportData: any) {
    this._passportData = passportData;
  }

  get passportData(): any {
    return this._passportData;
  }
}
