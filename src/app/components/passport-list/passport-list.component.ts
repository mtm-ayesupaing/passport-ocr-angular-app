import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Passport } from 'src/app/models/models';
import { PassportService } from 'src/app/services/passport.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from '../../../environments/environment';
import { PassportModelService } from 'src/app/service-models/passport-model.service';
import { PassportAddComponent } from 'src/app/dialogs/passport-add/passport-add.component';

@Component({
  selector: 'app-passport-list',
  templateUrl: './passport-list.component.html',
  styleUrls: ['./passport-list.component.scss']
})
export class PassportListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = ['passportNo', 'passportType', 'countryCode', 'name', 'action'];
  public dataSource = new MatTableDataSource<Passport>();
  public passports: Passport[] = [];

  constructor(
    private dialog: MatDialog,
    private apiMsg: ApiMessage,
    private snackBarSvc: SnackbarService,  
    private passportSvc: PassportService,
    public passportModelSvc: PassportModelService,
  ) { }

  ngOnInit(): void {
    this.getPassportList();
  }

  getPassportList(): void {
    this.passportSvc.getPassportList('passport_no').subscribe(passports => {
      this.passports = passports;
      this.showData();
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

  showData(): void {
    this.dataSource = new MatTableDataSource(this.passports);
    this.dataSource.paginator = this.paginator;
  }

  goToPassportForm(): void {

  }

  editPassport(passport: any): void {
    this.passportModelSvc.passportData = passport;
    this.passportModelSvc.type = 'update';
    const dialogRef = this.dialog.open(PassportAddComponent, {
      width: '900px',
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  deletePassport(passportNo: any): void {
    this.passportSvc.deletePassport(passportNo).subscribe((data) => {
      this.getPassportList();      
      this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.DELETE_USER, environment.snackBarShowingTime);
    }, error => {
      console.log('ERROR :: ', error);
    });
  }
}
