import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService implements OnInit,OnDestroy{
  
  private url:string = "https://backend-6hbb.onrender.com/api/";
  private _refresh$ = new Subject<void>();
  subscription: Subscription;
  
  constructor(private http:HttpClient, private authService:AuthService, private router:Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log("observable cerrado");
  }

  get refresh$(){
    return this._refresh$;
  }

  ngOnInit(): void {
    this.subscription = this.refresh$.subscribe(()=>{
      console.log("entre a subscription");
    })
    this.obtenerProy;
  }

  // persona
  obtenerDatos():Observable<any> {    
    return this.http.get<any>(this.url+"ver/personas");
  }

  editarPers(id:number, body:any):Observable<void>{
    console.log(body);
    console.log('entre editPers portfolioservice');
    return this.http.patch<void>(this.url+"editar/"+body.id, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  // educacion
  obtenerEdu():Observable<any> {    
    return this.http.get<any>(this.url+"ver/edu");
  }

  nuevoEdu(body:any):Observable<any>{
    console.log(body);
    console.log('entre nuevoEdu portfolioservice');
    return this.http.post<any>(this.url+"new/edu", body);
  }

  editarEdu(body:any):Observable<void>{
    console.log(body);
    console.log('entre editEdu portfolioservice');
    return this.http.patch<void>(this.url+"editarEdu/"+body.id, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  eliminarEdu(id:number):Observable<void>{
    console.log(id);
    console.log('entre eliminarEdu portfolioservice');
    return this.http.delete<void>(this.url+"deleteEdu/"+id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  // Experiencia    
  obtenerExp():Observable<any> {
    return this.http.get<any>(this.url+"ver/exp");
  }

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
    return this.http.post<any>(this.url+"new/proy", body);
  }

  editarProy(body:any):Observable<void>{
    console.log(body);
    console.log('entre editProy portfolioservice');
    return this.http.patch<void>(this.url+"editarProy/"+body.id, body).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  eliminarProy(id:number):Observable<void>{
    console.log(id);
    console.log('entre editProy portfolioservice');
    return this.http.delete<void>(this.url+"deleteProy/"+id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  

}
