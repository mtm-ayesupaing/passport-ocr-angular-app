import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassportModelService {
  private _passportData: any;
  private _type: string = '';
  constructor() { }

  set passportData(passportData: any) {
    this._passportData = passportData;
  }

  get passportData(): any {
    return this._passportData;
  }

  set type(type: any) {
    this._type = type;
  }

  get type(): any {
    return this._type;
  }
}
