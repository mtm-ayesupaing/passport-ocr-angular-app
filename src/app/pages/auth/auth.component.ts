import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public signInForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ])
  });

  public authFailureMessage = '';

  constructor(
    private loginService: LoginAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    // this.loginService.logout();
    this.loginService.login(this.signInForm.value.email, this.signInForm.value.password).then(res => {
      if (res) {
        console.log("Login Success");
        this.router.navigate(['/users']);
      }
    }).catch(error => {
      console.log('error ', error);
      // this.authFailureMessage = this.clientMsg.APPLICATION_ERROR.AUTH;
    });
  }
}
