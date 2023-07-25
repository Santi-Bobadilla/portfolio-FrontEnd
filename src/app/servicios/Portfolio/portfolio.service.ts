import { AfterViewInit, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService implements OnInit {

  // private url:string = "https://backend-6hbb.onrender.com/api/";
  private url: string = "http://localhost:8080/api/";
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

  loggIn: boolean = false;
  user:any;
  userI:any;
  header:any;
  educacion:any;

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    // //trae mail e id
    // this.userE()
    // // carga año para formulario
    // this.cargarAnio();
    // // header
    // this.obtenerDatos(this.user).subscribe(data=>{
    //   console.log(data);
    //   this.header = data;
    //   console.log(this.header);
    // })
    // //educacion
    // this.obtenerEdu(this.userI).subscribe(data=>{
    //   console.log(data);
    //   this.educacion = data;
    //   console.log(this.educacion);
    // })
  }

  getLoggIn() {
    // console.log(sessionStorage.getItem('loggIn'));
    if(sessionStorage.getItem('loggIn')!==null){
      this.loggIn=true;
    }
    return sessionStorage.getItem('loggIn');    
  }

  // funcion cargar año
  cargarAnio(){
    this.anio.push('');
    for (let index = this.anio1; index >= this.anio0; index--) {
      this.anio.push(index);
    }
    return this.anio;
  }

  // obtener user
  obtenerUserActual(email:string): Observable<any> {
    // console.log(email);
    return this.http.get<any>(this.url + "ver/user/"+email);
  }

  // obtener email
  userE(){
    if(sessionStorage.getItem('userE')!==null){
      this.user = sessionStorage.getItem('userE')
      // console.log(this.user);
      this.userId(this.user)
    }
    return this.user;
  }

  // obtener id
  userId(email:string){
    this.obtenerUserActual(email).subscribe(data => {
      sessionStorage.setItem('userId', data[0].id);
      // console.log(sessionStorage.getItem('userId'));
      this.userI = sessionStorage.getItem('userId');
      return this.userI;
    })
  }

  // persona

  obtenerDatos(email:string): Observable<any> {
    return this.http.get<any>(this.url + "ver/persona/"+email);
  }

  // obtenerDatos(): Observable<any> {
  //   return this.http.get<any>(this.url + "ver/personas");
  // }

  editarPers(id: number, body: any): Observable<void> {
    // console.log(body);
    // console.log('entre editPers portfolioservice');
    return this.http.patch<void>(this.url + "editar/" + body.id, body, { observe: 'response' }).pipe(map(res => {
      this.responseStatus = res.status;
      return this.responseStatus;
    }));
  }

  // educacion
  obtenerEdu(id:number): Observable<any> {
    console.log('entre obtenerEdu');
    console.log(id);
    return this.http.get<any>(this.url + "ver/edu/"+id);
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
  obtenerProy(id:number): Observable<any> {
    return this.http.get<any>(this.url + "ver/proy/"+id);
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
  obtenerExp(id:number): Observable<any> {
    console.log('entre obtenerExp');
    return this.http.get<any>(this.url + "ver/exp/"+id);
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
  obtenerSkill(id:number): Observable<any> {
    console.log('entre obtenerSkill');
    return this.http.get<any>(this.url + "ver/skill/"+id);
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
