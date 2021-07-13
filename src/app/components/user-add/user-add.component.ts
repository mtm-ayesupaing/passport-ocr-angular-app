import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { ErrorMessage } from 'src/app/constants/errorMessage';
import { User } from 'src/app/models/models';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
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
    role: new FormControl('', [
      Validators.required,
    ])
  });

  public users: User[] = [];
  public user = {
    name: null,
    email: null,
    pwd : null
  };
  public disableFlag = false;

  constructor(
    private errorMsg: ErrorMessage,
    private snackBarSvc: SnackbarService,
    private apiMsg: ApiMessage,
    private userSvc: UserService,
    private router: Router,
    public dialogRef: MatDialogRef<UserAddComponent>,
  ) { }

  ngOnInit(): void {
  }

  addUser(): void {
    const user = {
      name: this.userForms.value.name,
      email: this.userForms.value.email,
      pwd: this.userForms.value.password,
      // role: this.userForms.value.role,
    };
    this.userSvc.addUser(user).subscribe((data) => {
      this.users.unshift(data);
      this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.CREATE_USER, environment.snackBarShowingTime);
      this.disableFlag = false;
      this.dialogRef.close(true);
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

}
