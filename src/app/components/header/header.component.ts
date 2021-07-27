import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginAuthService } from 'src/app/services/login-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() enabledRoute = false;

  constructor(
    private authSvc: LoginAuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "passport",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/passport_icon.svg")
    );
  }

  ngOnInit(): void {
  }

  onClickMenuIcon(): any {
    
  }

  logout(): void {
    this.authSvc.logout();
  }

}
