import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService implements OnInit {

  private url:string = "https://backend-6hbb.onrender.com/api/";
  // private url: string = "http://localhost:8080/api/";

  responseStatus: any

  mes:any[] = ['','01','02','03','04','05','06','07','08','09','10','11','12']
  anio:any [] = [];
  anio0:any=1960;
  anio1:any=2023;

  provincias:any[] = 
  [
    {'name':'Buenos Aires'},
    {'name':'Catamarca'},
    {'name':'Chaco'},
    {'name':'Chubut'},
    {'name':'Córdoba'},
    {'name':'Corrientes'},
    {'name':'Entre Rios'},
    {'name':'Formosa'},
    {'name':'Jujuy'},
    {'name':'La Pampa'},
    {'name':'La Rioja'},
    {'name':'Mendoza'},
    {'name':'Misiones'},
    {'name':'Neuquen'},
    {'name':'Rio Negro'},
    {'name':'Salta'},
    {'name':'San Juan'},
    {'name':'San Luis'},
    {'name':'Santa Cruz'},
    {'name':'Santa Fe'},
    {'name':'Santiago del Estero'},
    {'name':'Tierra del Fuego'},
    {'name':'Tucuman'},
    {'name':'Ciudad Autonoma de Buenos Aires'}
  ]

  logueado:boolean=false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.logueado
    // console.log(this.logueado);
    this.cargarAnio();
  }

  // funcion cargar año
  cargarAnio(){
    this.anio.push('');
    for (let index = this.anio1; index >= this.anio0; index--) {
      this.anio.push(index);
    }
    return this.anio;
  }

  // persona
  obtenerDatos(): Observable<any> {
    return this.http.get<any>(this.url + "ver/personas");
  }

  editarPers(id: number, body: any): Observable<void> {
    // console.log(body);
    // console.log('entre editPers portfolioservice');
    return this.http.patch<void>(this.url + "editar/" + body.id, body, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

  // educacion
  obtenerEdu(): Observable<any> {
    return this.http.get<any>(this.url + "ver/edu");
  }

  nuevoEdu(body: any): Observable<any> {
    // console.log(body);
    // console.log('entre nuevoEdu portfolioservice');
    return this.http.post<any>(this.url + "new/edu", body, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

  editarEdu(body: any): Observable<void> {
    // console.log(body);
    // console.log('entre editEdu portfolioservice');
    return this.http.patch<void>(this.url + "editarEdu/" + body.id, body, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      // console.log(this.responseStatus);
      return this.responseStatus;
    }));
  }

  eliminarEdu(id: number): Observable<void> {
    // console.log(id);
    // console.log('entre eliminarEdu portfolioservice');
    return this.http.delete<void>(this.url + "deleteEdu/" + id, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

  // proyectos
  obtenerProy(): Observable<any> {
    return this.http.get<any>(this.url + "ver/proy");
  }

  nuevoProy(body: any): Observable<any> {
    // console.log(body);
    // console.log('entre nuevoProy portfolioservice');
    return this.http.post<any>(this.url + "new/proy", body, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

  editarProy(body: any): Observable<any> {
    // console.log(body);
    // console.log(this.responseStatus);
    // console.log('entre editProy portfolioservice');
    return this.http.patch<any>(this.url + "editarProy/" + body.id, body, { observe: 'response' }).pipe(
      map(res => {
        // console.log(res.status);
        this.responseStatus = res.status;
        return this.responseStatus;
      })
    );
  }

  eliminarProy(id: number): Observable<void> {
    // console.log(id);
    // console.log('entre editProy portfolioservice');
    return this.http.delete<void>(this.url + "deleteProy/" + id, { observe: 'response' }).pipe(map(res => {
      console.log(res.status);
      this.responseStatus = res.status;
      return this.responseStatus;
    }));

  }

  // Experiencia    
  obtenerExp(): Observable<any> {
    return this.http.get<any>(this.url + "ver/exp");
  }

  nuevoExp(body: any): Observable<any> {
    // console.log(body);
    // console.log('entre nuevoExp portfolioservice');
    return this.http.post<any>(this.url + "new/Exp", body, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

  editarExp(body: any): Observable<void> {
    // console.log(body);
    // console.log('entre editExp portfolioservice');
    return this.http.patch<any>(this.url + "editarExp/" + body.id, body, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

  eliminarExp(id: number): Observable<void> {
    // console.log(id);
    // console.log('entre editExp portfolioservice');
    return this.http.delete<void>(this.url + "deleteExp/" + id, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

  // skills
  obtenerSkill(): Observable<any> {
    return this.http.get<any>(this.url + "ver/skill");
  }

  nuevoSkill(body: any): Observable<any> {
    // console.log(body);
    // console.log('entre nuevoSkill portfolioservice');
    return this.http.post<any>(this.url + "new/Skill", body, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

  editarSkill(body: any): Observable<void> {
    // console.log(body);
    // console.log('entre editSkill portfolioservice');
    return this.http.patch<any>(this.url + "editarSkill/" + body.id, body, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

  eliminarSkill(id: number): Observable<void> {
    // console.log(id);
    // console.log('entre editSkill portfolioservice');
    return this.http.delete<void>(this.url + "deleteSkill/" + id, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

}
