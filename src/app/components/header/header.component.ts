import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from 'src/app/services/login-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authSvc: LoginAuthService
  ) { }

  ngOnInit(): void {
  }

  onClickMenuIcon(): any {
    
  }

  logout(): void {
    this.authSvc.logout();
  }

}
