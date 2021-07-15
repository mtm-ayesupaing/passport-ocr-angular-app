import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { Passport } from 'src/app/models/models';
import { PassportService } from 'src/app/services/passport.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

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
      // Validators.minLength(8),
      // Validators.maxLength(100)
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

  constructor(    
    private snackBarSvc: SnackbarService,    
    private apiMsg: ApiMessage,
    private passportSvc: PassportService,
  ) { }

  ngOnInit(): void {
  }

  savePassportData(): void {
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
    this.passportSvc.savePassport(passport).subscribe((data) => {
      this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.CREATE_USER, environment.snackBarShowingTime);
      // this.disableFlag = false;
      // this.dialogRef.close(true);
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

}
