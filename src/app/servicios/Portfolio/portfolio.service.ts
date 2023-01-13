import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService implements OnInit{

  private persona: any;

  private url:string = "http://localhost:8080/api/";

  constructor(private http:HttpClient, private authService:AuthService) { }

  ngOnInit(): void {
  }

  obtenerDatos():Observable<any> {    
    return this.http.get<any>(this.url+"ver/personas");
  }

  obtenerEdu():Observable<any> {    
    return this.http.get<any>(this.url+"ver/edu");
  }
    
   


  
  
}
