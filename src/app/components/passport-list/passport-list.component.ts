import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Passport } from 'src/app/models/models';
import { PassportService } from 'src/app/services/passport.service';
import { MatDialog } from '@angular/material/dialog';
import { Router} from '@angular/router';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PassportModelService } from 'src/app/service-models/passport-model.service';
import { PassportAddComponent } from 'src/app/dialogs/passport-add/passport-add.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import * as moment from 'moment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-passport-list',
  templateUrl: './passport-list.component.html',
  styleUrls: ['./passport-list.component.scss']
})
export class PassportListComponent implements OnInit {
  @ViewChild('table') table: ElementRef | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = ['passportType', 'countryCode', 'passportNo', 'name', 'dob', 'gender', 'issueDate', 'expiryDate', 'action'];
  public dataSource = new MatTableDataSource<Passport>();
  public passports: Passport[] = [];
  public csvData: any; 
  public searchForms = new FormGroup({
    passportNo: new FormControl(''),
    name: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });
  constructor(
    private dialog: MatDialog,
    public router: Router,
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
      this.csvData = passports;
      console.log(this.passports);
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
    this.router.navigate(['/image-upload']);
  }

  editPassport(passport: any): void {
    this.passportModelSvc.passportData = passport;
    this.passportModelSvc.type = 'Update';
    const dialogRef = this.dialog.open(PassportAddComponent, {
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe(() => {
    });
  }

  public exportToExcel(): void {
    let passports : any = [];
    passports = this.passports;
    const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(passports);
    const myworkbook: XLSX.WorkBook = { Sheets: { 'data': myworksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(myworkbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'passport_' + moment().format('YYYYMMDDhhmmss'));
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  searchPassport(): void {
    if (this.searchForms.value.passportNo === '' && this.searchForms.value.name === '' &&
      (this.searchForms.value.endDate === null || this.searchForms.value.endDate === '') &&
      (this.searchForms.value.startDate === null || this.searchForms.value.startDate === '')) {
      this.getPassportList();
      return;
    } 
    const passport = {
      passportNo: this.searchForms.value.passportNo,
      name: this.searchForms.value.name,
      startDate: this.searchForms.value.startDate === null || '' ? '' : this.searchForms.value.startDate,
      endDate: this.searchForms.value.endDate === null || '' ? '' : this.searchForms.value.endDate,
    };
    this.passportSvc.searchPassport(passport).subscribe((data) => {
      console.log(data);
      if (data.length > 0) {
        this.passports = data;
        this.csvData = data;
        this.showData();
      } else {
        this.passports = [];
        this.csvData = [];
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
      }
    }, error => {
      console.log('ERROR :: ', error);
    });

  }

  cancelFiltering(): void {
    this.searchForms.controls['name'].setValue('');
    this.searchForms.controls['passportNo'].setValue('');
    this.searchForms.controls['startDate'].setValue('');
    this.searchForms.controls['endDate'].setValue('');
    this.getPassportList();
  }

  deletePassport(passportNo: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: "400px",
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      const result = dialogResult;
      if (result) {
        this.passportSvc.deletePassport(passportNo).subscribe((data) => {
          this.getPassportList();      
          this.snackBarSvc.open(this.apiMsg.APPLICATION_RESULT.DELETE_USER, environment.snackBarShowingTime);
        }, error => {
          console.log('ERROR :: ', error);
        });
      }
    }); 
  }
}
