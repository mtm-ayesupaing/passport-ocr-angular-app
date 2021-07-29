import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { User } from 'src/app/models/models';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { UserAddComponent } from '../user-add/user-add.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  public dataSource = new MatTableDataSource<User>();
  public searchForms = new FormGroup({
    name: new FormControl('', []),
    email: new FormControl('', []),
  });

  public users: User[] = [];

  constructor(
    private userSvc: UserService,
    private apiMsg: ApiMessage,
    private dialog: MatDialog,
    private dialogSvc: DialogService,
    private snackBarSvc: SnackbarService
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.userSvc.getUserList('user_id').subscribe(users => {
      this.users = users;
      this.showData();
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

  showData(): void {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
  }

  addUserDialog(): void {
    this.dialogSvc.isEditUser = false;
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getUserList();
      }
    });
  }

  editUserDialog(user: any, index: any): void {
    this.dialogSvc.updatedUser = user;
    this.dialogSvc.isEditUser = true;
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '600px',
    });
  }

  deleteUser(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result = dialogResult;
      if (result) {
        this.userSvc.deleteUser(id).subscribe((data) => {
          this.getUserList();
          this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.DELETE_USER, environment.snackBarShowingTime);
        }, error => {
          console.log('ERROR :: ', error);
        });
      }
    }); 
  }

  searchUser(): void {
    const user = {      
      name: this.searchForms.value.name,
      email: this.searchForms.value.email,
    };
    if (user.name === "" && user.email === "") {
      this.getUserList();
    }
    this.userSvc.searchUser(user).subscribe((data) => {
      if (data.length > 0) {
        this.users = data;
        this.showData();
      } else {
        this.users = [];
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

}
