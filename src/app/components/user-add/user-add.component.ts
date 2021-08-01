import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { ErrorMessage } from 'src/app/constants/errorMessage';
import { User } from 'src/app/models/models';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from '../../../environments/environment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const pwd = control?.parent?.value['password'];
    const confirmPwd = control?.parent?.value['confirmPassword'];
    return pwd !== confirmPwd ? true : false;
  }
}

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  public users: User[] = [];
  public user = {
    name: null,
    email: null,
    pwd: null
  };  
  public isEdit = false;
  public modifiedUser = {
    id: 0,
    name: "",
    email: "",
    pwd: ""
  }
  public userTitle = "";
  public lblUserBtn = "";

  confirmedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('password')?.value;
    const confirmPwd = control.get('confirmPassword')?.value;
    return pwd !== confirmPwd ? { notSame: true } : null
  }

  public userForms = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ]),
    confirmPassword: new FormControl(''),
    role: new FormControl('', [
      Validators.required,
    ])
  }, {
    validators: this.confirmedValidator
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    private errorMsg: ErrorMessage,
    private apiMsg: ApiMessage,
    private snackBarSvc: SnackbarService,
    private userSvc: UserService,
    private dialogSvc: DialogService,
    public dialogRef: MatDialogRef<UserAddComponent>,
  ) { }

  ngOnInit(): void {
    this.isEdit = this.dialogSvc.isEditUser;
    if (this.isEdit) {
      this.modifiedUser.id = this.dialogSvc.updatedUser.id;
      this.modifiedUser.name = this.dialogSvc.updatedUser.name;
      this.modifiedUser.email = this.dialogSvc.updatedUser.email;
    }
    this.userTitle = this.isEdit ? "Update User" : "Add User";
    this.lblUserBtn = this.isEdit ? "Update" : "Save";
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.userForms.controls['name'].markAsTouched();
      this.userForms.controls['email'].markAsTouched();
      this.userForms.controls['password'].markAsTouched();
      this.userForms.controls['role'].markAsTouched();
    }, 0);
  }

  isValid(): boolean {
    let valid = true;
    const name = this.isEdit ? this.modifiedUser.name : this.userForms.value.name;
    const email = this.isEdit ? this.modifiedUser.email : this.userForms.value.email;
    const pwd = this.userForms.value.password;
    const confirmPwd = this.userForms.value.confirmPassword;
    if (name === "" || email === "" ||
      pwd === "" || confirmPwd === "") {
      valid = false;
    }
    if (pwd !== confirmPwd) {
      valid = false;
      this.snackBarSvc.open(this.errorMsg.FORMAT_ERROR.INVALID_PASSWORD('Confirm Password'), environment.snackBarShowingTime);
    }
    return valid;
  }

  addUser(): void {
    if (!this.isValid()) {
      return;
    }
    if (!this.isEdit) {
      const user = {
        name: this.userForms.value.name,
        email: this.userForms.value.email,
        pwd: this.userForms.value.password,
        // role: this.userForms.value.role,
      };
      this.userSvc.addUser(user).subscribe((data) => {
        if (data.includes("Duplicate Email!")) {
          this.snackBarSvc.open(data, environment.snackBarShowingTime);
        } else {
          this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.CREATE_USER, environment.snackBarShowingTime);
          this.dialogRef.close(true);
        }
      }, error => {
        console.log('ERROR :: ', error);
      });
    } else {
      this.modifiedUser.pwd = this.userForms.value.password;
      this.userSvc.updateUser(this.modifiedUser.id, this.modifiedUser).subscribe((data) => {
        this.users.unshift(data);
        this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.UPDATE_USER, environment.snackBarShowingTime);
        this.dialogRef.close(true);
      }, error => {
        console.log('ERROR :: ', error);
      });
    }
  }

}
