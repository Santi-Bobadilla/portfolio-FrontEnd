import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { Credentials } from 'src/app/modelo/modelo';
import { LoginComponent } from 'src/app/componentes/login/login.component';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'https://backend-6hbb.onrender.com/login';
  currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>({'currentUser':null});
  
  constructor(private http:HttpClient, private router:Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || "{}"));
    console.log(this.currentUserSubject.value);
  }

  iniciarSesion(credentials:any): Observable<any> {
    return this.http.post(this.api,credentials, {observe: 'response'}).pipe(map((response: HttpResponse<any>) => {
      console.log(JSON.stringify(response));
      console.log(response);
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization');
      const token = bearerToken && bearerToken.replace('Bearer ', '');
      console.log(token);
      sessionStorage.setItem('currentUser', JSON.stringify(token));
      console.log(sessionStorage.getItem('currentUser'));
      this.currentUserSubject.next(token);
      return token;
    }))
  }

  // iniciarSesion(credentials:any): Observable<any> {
  //   return this.http.post(this.api,credentials).pipe(map(data=>{
  //     console.log(JSON.stringify(data));
  //     sessionStorage.setItem('currentUser',JSON.stringify(data));
  //     console.log(sessionStorage.getItem('currentUser'));      
  //     this.currentUserSubject.next(data);
  //     return data;
  //   }))
  // }
  
  
  getToken() {
    return sessionStorage.getItem('currentUser');
  }

  logOut(){
    let a = confirm("¿esta seguro que desea cerrar la sesion?");
    if (a===true) {
      sessionStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    } else {
      this.currentUserSubject.next(null);
      this.router.navigate(['/portfolio']);
    }
    
  }

  get UsuarioAutenticado(){    
    return this.currentUserSubject.value;
  }

  
}
