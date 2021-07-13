import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAuthService } from './services/login-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ocr-angular-app';
  public enabledRoute = false;

  constructor(
    private authService: LoginAuthService,
    private router: Router,
  ) {
    this.router.events.subscribe(event => {
      if (this.router.url === '/') {
        this.enabledRoute = false;
      } else {
        this.enabledRoute = this.authService.isAuthenticated();
      }
    });
  }
}
