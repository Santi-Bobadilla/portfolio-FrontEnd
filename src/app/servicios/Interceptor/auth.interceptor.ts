import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { LoaderService } from '../Loader/loader.service';
import { PortfolioService } from '../Portfolio/portfolio.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(protected  authService:AuthService, private loaderService: LoaderService, private portfolioService:PortfolioService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    var currentUser = this.authService.UsuarioAutenticado;
    if(currentUser) {
      request= request.clone({
        setHeaders: {
          'Authorization': `Bearer ${currentUser}`,
          // 'Access-Control-Allow-Origin': 'http://localhost:4200'
        },
      })
    }
    // console.log('interceptor esta corriendo: '+JSON.stringify(currentUser));
    // return next.handle(request);
    return next.handle(request).pipe(
      tap({
        next:(next) => {
          // this.portfolioService.responseStatus= next;
          // console.log(this.portfolioService.responseStatus);
          return next
        },
        error: (error) => {
          // this.portfolioService.responseStatus= next.type;
          console.log(this.portfolioService.responseStatus);
          
          return this.portfolioService.responseStatus;
          console.log(error);          
        },
        finalize:() => {
          this.loaderService.hide()
          console.log(this.portfolioService.responseStatus);
          return this.portfolioService.responseStatus;
        },
      })
      // finalize(() => this.loaderService.hide()),
      );
    }

    // mensajeError(error: HttpErrorResponse){
    //   console.log(error);
    //   console.log('sucedio un error');
    //   console.warn(error)
    //   return throwError('prueba error')      
    // }

}
