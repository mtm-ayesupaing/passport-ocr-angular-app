import { Injectable } from '@angular/core';
import { LoginAuthService } from '../services/login-auth.service';
import { SpinnerService } from '../services/spinner.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private strapiAuthService: LoginAuthService,
    private spinnerService: SpinnerService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.strapiAuthService.token;
    this.spinnerService.show();
    if (token !== 'null' && typeof (token) !== 'object') {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next
      .handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hide();
          }
        }, (error) => {
          this.spinnerService.hide();
        })
      );
  }
}
