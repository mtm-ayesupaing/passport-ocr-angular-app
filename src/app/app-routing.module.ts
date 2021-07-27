import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { PassportAddComponent } from './dialogs/passport-add/passport-add.component';
import { PassportListComponent } from './components/passport-list/passport-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from './guard/auth.guard';

import { AuthComponent } from './pages/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UserListComponent
  },
  {
    path: 'image-upload',
    canActivate: [AuthGuard],
    component: ImageUploadComponent
  },
  {
    path: 'add-passport',
    canActivate: [AuthGuard],
    component: PassportAddComponent
  },
  {
    path: 'passport-list',
    canActivate: [AuthGuard],
    component: PassportListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
