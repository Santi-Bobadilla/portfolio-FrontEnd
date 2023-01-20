import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(protected  authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser = this.authService.UsuarioAutenticado;
    if(currentUser) {
      request= request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`
        }
        // withCredentials:false
      })
    }
    console.log('interceptor esta corriendo: '+JSON.stringify(currentUser));
    return next.handle(request);
  }

}
