import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { UploadImageService } from 'src/app/services/upload-image.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { PassportModelService } from 'src/app/service-models/passport-model.service';
import { ActivatedRoute, Router} from '@angular/router';
import { PassportAddComponent } from 'src/app/dialogs/passport-add/passport-add.component';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  public formData: FormData = new FormData();
  public file: any;
  public url: any;
  public convertedData = "";
  public passportData : any;
  @ViewChild('imageInput') imageInput: any;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  public isGoodResolution: boolean = false;
  public imagePath: any;
  public message = '';
  constructor(
    private userSvc: UserService,
    private uploadImgSvc: UploadImageService,
    private apiMsg: ApiMessage,
    private snackBarSvc: SnackbarService,
    private dialog: MatDialog,
    public formBuilder: FormBuilder,
    public router: Router,
    public passportModelSvc: PassportModelService,
  ) { }

  ngOnInit(): void {
  }

  onChangeImage(event: any) {
    this.formData = new FormData();
    const URL = window.URL || window.webkitURL;
    const Img = new Image();
    const filesToUpload = (event.target.files);
    const file = filesToUpload[0] as HTMLInputElement;    
    Img.src = URL.createObjectURL(filesToUpload[0]);    
    Img.onload = (e: any) => {
      const height = e.path[0].height;
      const width = e.path[0].width;
      if ( width < 1000 && height < 900) {
        this.snackBarSvc.open('full resolution is not included in Your Uploaded File ', 5000);
        this.isGoodResolution = false;
        this.url = '';
      } else {
        this.isGoodResolution = true;
        var reader = new FileReader();
        this.imagePath = event.target.files;
        reader.readAsDataURL(event.target.files[0]); 
        reader.onload = (_event) => { 
          this.url = reader.result; 
        }
        this.formData.append('file', event.target.files[0], event.target.files[0].name);
      }
    }
  }

  async uploadImage(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.uploadImgSvc.uploadImage(this.formData).subscribe(
        (res: any) => {
          this.convertedData = res.raw_data;
          this.passportModelSvc.passportData = res;
          this.passportModelSvc.type = 'save';
        },
        (err: any) => {
        })
    });
  }

  bindPassportData(): void {
    const dialogRef = this.dialog.open(PassportAddComponent, {
      width: '40vw',
    });
    dialogRef.afterClosed().subscribe(() => {
      
    });
  }
}
