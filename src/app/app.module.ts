// app modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';

// share modules
import { AngularMaterialModule } from './material/material-shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { IntercepterSharedModule } from './interceptors/interceptor-shared.module';
import { CommonDialogComponent } from './components/common-dialog/common-dialog.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { PassportAddComponent } from './dialogs/passport-add/passport-add.component';
import { PassportListComponent } from './components/passport-list/passport-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    CommonDialogComponent,
    UserListComponent,
    UserAddComponent,
    ImageUploadComponent,
    PassportAddComponent,
    PassportListComponent
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    IntercepterSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
