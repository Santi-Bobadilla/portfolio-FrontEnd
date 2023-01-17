import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser = this.authService.UsuarioAutenticado;
    if(currentUser) {
      request= request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`
        }
      })
    }
    console.log('interceptor esta corriendo: '+JSON.stringify(currentUser));
    return next.handle(request);
  }

}
