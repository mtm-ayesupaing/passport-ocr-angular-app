import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { Passport } from 'src/app/models/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PassportService } from 'src/app/services/passport.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { PassportModelService } from 'src/app/service-models/passport-model.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-passport-add',
  templateUrl: './passport-add.component.html',
  styleUrls: ['./passport-add.component.scss']
})
export class PassportAddComponent implements OnInit {
  public passportForms = new FormGroup({
    passportType: new FormControl('', [
      Validators.required,
    ]),
    countryCode: new FormControl('', [
      Validators.required,
    ]),
    passportNo: new FormControl('', [
      Validators.required,
    ]),
    name: new FormControl('', [
      Validators.required,
    ]),
    nationality: new FormControl('', [
      Validators.required,
    ]),
    dob: new FormControl('', [
      Validators.required,
    ]),
    gender: new FormControl('', [
      Validators.required,
    ]),
    issueDate: new FormControl('', [
      Validators.required,
    ]),
    expiryDate: new FormControl('', [
      Validators.required,
    ]),
    birthPlace: new FormControl('', [
      Validators.required,
    ]),
    authority: new FormControl('', [
      Validators.required,
    ])
  });
  public passports: Passport[] = [];
  public passportParam: any;
  public disableInput : boolean = true;
  constructor(
    private snackBarSvc: SnackbarService,    
    private apiMsg: ApiMessage,
    private passportSvc: PassportService,
    public dialogRef: MatDialogRef<PassportAddComponent>,
    public passportModelSvc: PassportModelService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.passportParam = this.passportModelSvc.passportData;
    this.disableControl();  
    this.passportParam.dob = await this.getDateFormat(this.passportParam.dob);
    this.passportParam.issue_date = await this.getDateFormat(this.passportParam.issue_date);
    this.passportParam.expiry_date = await this.getDateFormat(this.passportParam.expiry_date);
    this.passportParam.gender = this.passportParam.gender.indexOf('F') !== -1 ? 'Female' : 'Male';
  }

  async getDateFormat(date: any): Promise<any> {
    const dateArr = date.split(' ');
    const month = await this.convertMonth(dateArr[1]);
    const dateRes = month + '/' + dateArr[0] + '/' + dateArr[2];
    return dateRes;
  }

  async convertMonth(month: string): Promise<any> {
    if ( month === 'JAN' )  return '1';
    else if ( month === 'FEB' ) return '2';
    else if ( month === 'MAR' ) return '3';
    else if ( month === 'APR' ) return '4';
    else if ( month === 'MAY' ) return '5';
    else if ( month === 'JUNE' ) return '6';
    else if ( month === 'JULY' ) return '7';
    else if ( month === 'AUG' ) return '8';
    else if ( month === 'SEP' ) return '9';
    else if ( month === '0CT' ) return '10';
    else if ( month === 'NOV' ) return '11';
    else if ( month === 'DEC' ) return '12';
  }

  disableControl(): void {
    if (this.passportModelSvc.type === 'update') {
      this.passportForms.controls['passportType'].disable();
      this.passportForms.controls['passportNo'].disable();
      this.passportForms.controls['countryCode'].disable();
    } else {
      this.passportForms.controls['passportType'].enable();
      this.passportForms.controls['passportNo'].enable();
      this.passportForms.controls['countryCode'].enable();
    }
  }

  async savePassportData(): Promise<void> {
    const passport = {
      passportType: this.passportForms.value.passportType,
      countryCode: this.passportForms.value.countryCode,
      passportNo: this.passportForms.value.passportNo,
      name: this.passportForms.value.name,
      nationality: this.passportForms.value.nationality,
      dob: this.passportForms.value.dob,
      gender: this.passportForms.value.gender,
      issueDate: this.passportForms.value.issueDate,
      expiryDate: this.passportForms.value.expiryDate,
      birthPlace: this.passportForms.value.birthPlace,
      authority: this.passportForms.value.authority
    };

    if(this.passportModelSvc.type === 'save') { // save
      const duplicateData = await this.checkDuplicate(passport); // check duplicate
      console.log(duplicateData);
      if (duplicateData.length > 0) {
        this.snackBarSvc.open('Duplicate Passport No.', 5000);
        return;
      }
      this.passportSvc.savePassport(passport).subscribe((data) => {
        this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.CREATE_USER, environment.snackBarShowingTime);
        this.dialogRef.close(true);
      }, error => {
        console.log('ERROR :: ', error);
      });
    } else {  // update
      this.passportSvc.updatePassport(passport.passportNo, passport).subscribe((data) => {
        this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.UPDATE_USER, environment.snackBarShowingTime);
        this.dialogRef.close(true);
      }, error => {
        console.log('ERROR :: ', error);
      });
    }    
  }

  async checkDuplicate(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const targetPeriods = [];
      let uniquePeriod: any = [];
      this.passportSvc.searchPassport(params.passportNo).subscribe(
        async (datas: any) => {
            resolve(datas);
            return;
        }, (error: any) => reject(error)
      );
    });
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
  

}
