import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  public formData: FormData = new FormData();
  public file: any;
  public url: any;
  public converted_data = "";

  constructor(
    private userSvc: UserService,
  ) { }

  ngOnInit(): void {
  }

  onChangeImage(event: any) {
    this.file = event.target.files[0];
    this.formData.append('file', this.file, this.file.name);    
    var reader = new FileReader();
		reader.readAsDataURL(this.file);
		
		reader.onload = (_event) => {
			this.url = reader.result; 
		}
  }

  uploadImage(): void {
    console.log("FILE :: ", this.file);
    this.userSvc.uploadImage(this.formData).subscribe((data) => {
      console.log("Image Data :: ", data);
      this.converted_data = data;
    }, error => {
      console.log('ERROR :: ', error);
    });
  }
}
