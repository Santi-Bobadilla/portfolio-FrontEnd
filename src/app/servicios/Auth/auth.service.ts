import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'https://localhost:8080/api';
  token:any;
  
  constructor(private http:HttpClient, private router:Router) { }
  
  login(email:string, password:string) {
    this.http.post(this.api + '/login', { email: email, password: password})
     .subscribe((resp:any) => {
          // redireccionamos al usuario a su perfil
          this.router.navigate(['profile']);
          localStorage.setItem('auth_token', resp.token);
    })
  };

  // eliminamos el token de localstorage y redirigimos al inicio
  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigate(['']);
  }

  // verifico si existe sesión activa
  public get logIn():boolean{
    console.log(localStorage.getItem('auth_token'));
    
    return (localStorage.getItem('auth_token') !== null);
  }

}