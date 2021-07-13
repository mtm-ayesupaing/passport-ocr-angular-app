import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {  
  public updatedUser: any;
  public userName = "";
  public userEmail = "";

  constructor(
    private dialogSvc: DialogService,
  ) { }

  ngOnInit(): void {
    this.updatedUser = this.dialogSvc.updatedUser;
    console.log("Updated User :: ", this.updatedUser);
    // this.userName = this.updatedUser.name;
    this.userEmail = this.updatedUser.email;
  }

  updateUser(): void {

  }

}
