import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  api = 'http://localhost:8080/api';
  token:any;
  currentUserSubject: BehaviorSubject<any>;
  
  constructor(private http:HttpClient, private router:Router) { 
    console.log("el servicio de autenticacion esta corriendo");
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || "{}"));

    
  }

  iniciarSesion(credentials:any): Observable<any> {
    return this.http.post(this.api + '/login', credentials).pipe(map(data=> {
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      return data;
    })
    );
  }
  
  
}