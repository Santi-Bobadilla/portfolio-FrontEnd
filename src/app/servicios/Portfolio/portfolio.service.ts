import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { Proyecto } from 'src/app/modelo/modelo';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService implements OnInit{

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
    
  obtenerExp():Observable<any> {
    return this.http.get<any>(this.url+"ver/exp");
  }

  obtenerSkill():Observable<any> {
    return this.http.get<any>(this.url+"ver/skill");
  }

  obtenerProy():Observable<any> {
    return this.http.get<any>(this.url+"ver/proy");
  }

  nuevoProy(body:any):Observable<any>{
    console.log(body);
    console.log('entre nuevoProy portfolioservice');
    return this.http.post<any>(this.url+"new/proy", body);
  }

  editarProy(body:any):Observable<void>{
    console.log(body);
    console.log('entre editProy portfolioservice');
    return this.http.patch<void>(this.url+"editarProy/"+body.id, body);
    // return this.http.put<void>(this.url+"editarProy/"+body.id, body);
  }
  
}
