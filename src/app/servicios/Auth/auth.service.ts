import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { PortfolioService } from '../Portfolio/portfolio.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'https://backend-6hbb.onrender.com/api/login';
  // api = 'http://localhost:8080/api/login';
  b:any=false;
  currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>({'currentUser':null});

  constructor(private http:HttpClient, private router:Router, protected portfolioService:PortfolioService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || "{}"));
  }

  iniciarSesion(credentials:any): Observable<any> {
    return this.http.post(this.api,credentials, {observe: 'response'}).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;   
      const headers = response.headers;
      const bearerToken = headers.get('Authorization');
      const token = bearerToken && bearerToken.replace('Bearer ', '');
      sessionStorage.setItem('currentUser', JSON.stringify(token));
      this.portfolioService.logueado=true;
      this.currentUserSubject.next({'token':token});
      return this.currentUserSubject;
    }))
  }
  
  getToken() {
    // console.log(sessionStorage.getItem('currentUser'));
    return sessionStorage.getItem('currentUser');
  }

  logOut(){
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    // let a = confirm("¿esta seguro que desea cerrar la sesion?");
    // if (a===true) {
    //   sessionStorage.removeItem('currentUser');
    //   this.currentUserSubject.next(null);
    //   this.router.navigate(['/login']);
    // } else {
    //   this.currentUserSubject.next(null);
    //   this.router.navigate(['/portfolio']);
    // }
  }

  get usuarioAutenticado(){
    // console.log(this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }
  
}
