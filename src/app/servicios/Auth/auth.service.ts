import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'https://backend-6hbb.onrender.com/api/login';
  currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>({'currentUser':null});
  
  constructor(private http:HttpClient, private router:Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || "{}"));
    console.log(this.currentUserSubject.value);
  }

  iniciarSesion(credentials:any): Observable<any> {
    return this.http.post(this.api,credentials, {observe: 'response'}).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization');
      const token = bearerToken && bearerToken.replace('Bearer ', '');
      sessionStorage.setItem('currentUser', JSON.stringify(token));
      this.currentUserSubject.next(token);
      return token;
    }))
  }
  
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
