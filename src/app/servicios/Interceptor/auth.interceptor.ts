import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { LoaderService } from '../Loader/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(protected  authService:AuthService, private loaderService: LoaderService) {}

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
      finalize(() => this.loaderService.hide()),
      );
    }

}
