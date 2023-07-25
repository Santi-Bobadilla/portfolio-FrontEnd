import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { PortfolioService } from '../Portfolio/portfolio.service';
import { JwtServiceService } from '../JwtService/jwt-service.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  // api = 'https://backend-6hbb.onrender.com/api';
  api = 'http://localhost:8080/api';
  currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>({'currentUser':null});

  constructor(private http:HttpClient, private router:Router, protected portfolioService:PortfolioService, private jwtService:JwtServiceService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || "{}"));
  }

  iniciarSesion(credentials:any): Observable<any> {
    return this.http.post(this.api+'/login',credentials, {observe: 'response'}).pipe(map((response: HttpResponse<any>) => {
      console.log('entre a iniciarSesion');      
      const headers = response.headers;
      const bearerToken = headers.get('Authorization');
      const token = bearerToken && bearerToken.replace('Bearer ', '');
      const loggIn = true;
      this.decode(JSON.stringify(token));
      sessionStorage.setItem('currentUser', JSON.stringify(token));
      sessionStorage.setItem('loggIn', JSON.stringify(true));
      this.currentUserSubject.next({'token':token,'loggIn':loggIn});
      return this.currentUserSubject;
    }))
  }

  getToken() {
    // console.log(sessionStorage.getItem('currentUser'));
    return sessionStorage.getItem('currentUser');
  }

  logOut(){
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('loggIn');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userE');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  get usuarioAutenticado(){
    // console.log(this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  checkUser(credentials:any): Observable<any> {
    return this.http.post<any>(this.api+'/check/user', credentials.email);
  }

  decode(token:string){
    // let t = this.token2;
    console.log('entre decode');    
    let t = this.jwtService.DecodeToken(token);
    let result = Object.entries(t);
    if(sessionStorage.getItem('userE')==null){
      sessionStorage.setItem('userE', result[0][1]);
      this.portfolioService.user=result[0][1]
      // this.decode2(result[0][1])
      return result[0][1]
    }
    this.portfolioService.user=result[0][1]
    this.decode2(result[0][1])
    return sessionStorage.getItem('userE');
  }

  decode2(email:string){
    console.log('entre decode2');
    this.portfolioService.obtenerUserActual(email).subscribe(data => {
      sessionStorage.setItem('userId', data[0].id);
      console.log(sessionStorage.getItem('userId'));
      console.log(data[0].id);
      return sessionStorage.getItem('userId');
    })
  }

  editar(){
    let user = sessionStorage.getItem('userId');
    this.router.navigateByUrl('/editar/'+user)
  }

  registrarse(credentials:any) {
    return this.http.post(this.api+'/new/user',credentials, {observe: 'response'}).pipe(map((response: HttpResponse<any>) => {
      console.log(response);
      console.log('entre a registrarse');
      // this.iniciarSesion(credentials)
      // sessionStorage.setItem('currentUser', '');
      this.router.navigate(['/login']);
    }))

    return this.http.post(this.api+'/new/user',credentials, {observe: 'response'}).pipe(map((response: HttpResponse<any>) => {
      console.log(credentials);
      console.log(response);
      console.log('entre a registrarse');
      // return this.http.post(this.api+'/check/user', credentials.email);
      // console.log(this.http.post(this.api+'/check/user', credentials));
      // this.iniciarSesion(credentials);
    }))
  }
  
}
