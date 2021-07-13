import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    // canActivate: [AuthGuard],
    component: UserListComponent
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
