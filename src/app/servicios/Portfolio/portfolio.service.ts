import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService implements OnInit{
  
  // private url:string = "https://backend-6hbb.onrender.com/api/";
  private url:string = "http://localhost:8080/api/";
  private _refresh$ = new Subject<void>();
  subscription: Subscription;
  responseStatus: any
  
  constructor(private http:HttpClient, private authService:AuthService, private router:Router) {}

  ngOnInit(): void {
    
  }

  // persona
  obtenerDatos():Observable<any> {    
    return this.http.get<any>(this.url+"ver/personas");
  }

  editarPers(id:number, body:any):Observable<void>{
    console.log(body);
    console.log('entre editPers portfolioservice');
    return this.http.patch<void>(this.url+"editar/"+body.id, body, {observe: 'response'}).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
   }));
  }

  // educacion
  obtenerEdu():Observable<any> {    
    return this.http.get<any>(this.url+"ver/edu");
  }

  nuevoEdu(body:any):Observable<any>{
    console.log(body);
    console.log('entre nuevoEdu portfolioservice');
    return this.http.post<any>(this.url+"new/edu", body, {observe: 'response'}).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
   }));
  }

  editarEdu(body:any):Observable<void>{
    console.log(body);
    console.log('entre editEdu portfolioservice');
    return this.http.patch<void>(this.url+"editarEdu/"+body.id, body, {observe: 'response'}).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
   }));
  }

  eliminarEdu(id:number):Observable<void>{
    console.log(id);
    console.log('entre eliminarEdu portfolioservice');
    return this.http.delete<void>(this.url+"deleteEdu/"+id, {observe: 'response'}).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
   }));
  }

  // Experiencia    
  obtenerExp():Observable<any> {
    return this.http.get<any>(this.url+"ver/exp");
  }

  // skills
  obtenerSkill():Observable<any> {
    return this.http.get<any>(this.url+"ver/skill");
  }

  // proyectos
  obtenerProy():Observable<any> {
    return this.http.get<any>(this.url+"ver/proy");
  }

  nuevoProy(body:any):Observable<any>{
    console.log(body);
    console.log('entre nuevoProy portfolioservice');
    return this.http.post<any>(this.url+"new/proy", body, {observe: 'response'}).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
   }));
  }

  editarProy(body:any):Observable<void>{
    console.log(body);
    console.log('entre editProy portfolioservice');
    return this.http.patch<any>(this.url+"editarProy/"+body.id, body, {observe: 'response'}).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
   }));
  }

  eliminarProy(id:number):Observable<void>{
    console.log(id);
    console.log('entre editProy portfolioservice');
    return this.http.delete<void>(this.url+"deleteProy/"+id, {observe: 'response'}).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
   }));
  }
  

}
