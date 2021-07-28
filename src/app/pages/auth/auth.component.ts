import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from 'src/app/services/login-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessage } from 'src/app/constants/errorMessage';

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
    private errorMsg: ErrorMessage,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginService.login(this.signInForm.value.email, this.signInForm.value.password).then(data => {
      if (data.result && data.token) {
        console.log("Login Success");
        this.router.navigate(['/users']);
      } else {
        this.authFailureMessage = this.errorMsg.APPLICATION_ERROR.AUTH;
      }
    }).catch(error => {
      console.log('error ', error);
      this.authFailureMessage = this.errorMsg.APPLICATION_ERROR.AUTH;
    });
  }
}
