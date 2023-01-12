import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { Credentials } from 'src/app/clases/persona';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'http://localhost:8080/api';
  currentUserSubject: BehaviorSubject<any>;
  
  constructor(private http:HttpClient, private router:Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || "{}"));

    
  }

  iniciarSesion(credentials:Credentials): Observable<any> {
    return this.http.post(this.api + '/login', credentials, {observe: 'response'}).pipe(map((response: HttpResponse<any>) => {
      const body = response.body;
      const headers = response.headers;
      const bearerToken = headers.get('Authorization');
      const token = bearerToken && bearerToken.replace('Bearer ', '');
      sessionStorage.setItem('currentUser', JSON.stringify(token));                  
      return bearerToken;
    }))
  }
  
  getToken() {
    return sessionStorage.getItem('currentUser');
  }

  logOut(){
    let a = confirm("¿esta seguro que desea cerrar la sesion?");
    console.log(a);
    if (a===true) {
      sessionStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    } else {
      this.currentUserSubject.next(null);
      this.router.navigate(['/portfolio']);
    }
    
  }

  
}