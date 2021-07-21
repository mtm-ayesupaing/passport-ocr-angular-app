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
  public isEdit = false;
  public modifiedUser = {
    id: 0,
    name: "",
    email: ""
  }
  public userTitle = "";
  public lblUserBtn = "";

  constructor(
    private errorMsg: ErrorMessage,
    private apiMsg: ApiMessage,
    private snackBarSvc: SnackbarService,    
    private userSvc: UserService,
    private dialogSvc: DialogService,
    private router: Router,
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

  addUser(): void {
    const user = {
      name: this.userForms.value.name,
      email: this.userForms.value.email,
      pwd: this.userForms.value.password,
      // role: this.userForms.value.role,
    };
    if (!this.isEdit) {
      this.userSvc.addUser(user).subscribe((data) => {
        if (data.includes("Duplicate Email!")) {
          this.snackBarSvc.open(data, environment.snackBarShowingTime);
        } else {
          this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.CREATE_USER, environment.snackBarShowingTime);
          this.disableFlag = false;
          this.dialogRef.close(true);
        }        
      }, error => {
        console.log('ERROR :: ', error);
      });
    } else {
      this.userSvc.updateUser(this.modifiedUser.id, this.modifiedUser).subscribe((data) => {
        this.users.unshift(data);
        this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.UPDATE_USER, environment.snackBarShowingTime);
        this.disableFlag = false;
        this.dialogRef.close(true);
      }, error => {
        console.log('ERROR :: ', error);
      });
    }
    
  }

}
