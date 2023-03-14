import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { LoaderService } from '../Loader/loader.service';
import { PortfolioService } from '../Portfolio/portfolio.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(protected authService: AuthService, private loaderService: LoaderService, private portfolioService: PortfolioService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    var currentUser = this.authService.usuarioAutenticado;
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${currentUser.token}`,
        },
      })
    }
    return next.handle(request).pipe(
      tap({
        next: (next) => {
          return next
        },
        error: (error) => {
          console.log(error);
          return error;
        },
        finalize: () => {
          this.loaderService.hide()
          return this.portfolioService.responseStatus;
        },
      })
    );
  }

}
