import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { Passport } from 'src/app/models/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PassportService } from 'src/app/services/passport.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { PassportModelService } from 'src/app/service-models/passport-model.service';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';

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
    console.log(this.passportParam);
    this.disableControl();  
    this.passportParam.dob = await this.getDateFormat(this.passportParam.dob);
    this.passportParam.issue_date = await this.getDateFormat(this.passportParam.issue_date);
    this.passportParam.expiry_date = await this.getDateFormat(this.passportParam.expiry_date);
    this.passportParam.gender = this.passportParam.gender.indexOf('F') !== -1 ? 'Female' : 'Male';
  }

  async getDateFormat(date: any): Promise<any> {
    if (!date) return '';
    if (this.passportModelSvc.type === 'update') {
      return moment(new Date(date)).format('YYYY-MM-DD');
    } else {
      const monthArr = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', '0CT', 'N0V'];
      let month = ''; let day = ''; let year = ''; 
      await monthArr.forEach((val: any) => {
        if(date.indexOf(val) !== -1) {
          month = val;
          return;
        }
      });
      if(month) {
        const dateArr = date.split(month);
        console.log(dateArr);
        day = dateArr[0].match(/\d/g).join("");
        year = dateArr[1].match(/\d/g).join("");
        return moment(new Date(day + ' ' + month.replace('0', 'O') + ' ' + year)).format('YYYY-MM-DD');
      }
    }
  }

  async selectDate($event: any, kind: string): Promise<any> {
    if (kind === 'dob') {
      this.passportParam.dob = moment(new Date($event.value)).format('YYYY-MM-DD');
    } else if (kind === 'issueDate') {      
      this.passportParam.issue_date = moment(new Date($event.value)).format('YYYY-MM-DD');
    } else if (kind === 'expiryDate') {      
      this.passportParam.expiry_date = moment(new Date($event.value)).format('YYYY-MM-DD');
    }
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
      passportType: this.passportParam.passport_type,
      countryCode: this.passportParam.country_code,
      passportNo: this.passportParam.passport_no,
      name: this.passportForms.value.name,
      nationality: this.passportForms.value.nationality,
      dob: this.passportParam.dob,
      gender: this.passportForms.value.gender,
      issueDate: this.passportParam.issue_date,
      expiryDate: this.passportParam.expiry_date,
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
      this.passportSvc.getPassportNo(params.passportNo).subscribe(
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
  
  public checkError = (controlName: string, errorName: string) => {
    return this.passportForms.controls[controlName].hasError(errorName);
  }
}
