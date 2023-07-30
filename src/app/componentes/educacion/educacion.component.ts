import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, mergeMap, Observable, Subject } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit{

  // educacion$:Observable<any>;
  educacion:any;
  educacionForm: FormGroup;
  resp:any;
  condition:any [] = [
    {'name': 'Finalizado'},
    {'name': 'En curso'},
    {'name': 'Abandonado'}
  ]
  mes:any[];
  anio:any [];
  userId:any;
  loadEd:boolean=false;
  sinData:number=0;
  errorMessage:string = ''
 
  constructor(protected portfolioService:PortfolioService, private formBuilder:FormBuilder) {}  
    
  ngOnInit(){
    this.sinData=0
    this.mes=this.portfolioService.mes;
    this.anio=this.portfolioService.anio;
    this.educacionForm = this.initForm();
    this.resp='';
    // obtener educacion
    this.portfolioService.obtenerDatosPorUsername(this.portfolioService.currentRoute).pipe(
      mergeMap((res:any)=>
        this.portfolioService.obtenerEdu(res[0].id)
      ),
    ).subscribe(data=>{
      this.loadEd=true;
      // console.log(data);
      if(data.length>0){
        data.sort((a:any,b:any)=>b.id-a.id);
        // console.log(data);
        this.educacion = data;
        // console.log(this.educacion);
      } else{
        // console.log('entre a else');
        this.sinData=1
        this.educacion=Array({anio_fin:"", anio_inicio: '', certificacion:'', condicion:{id: 1, nombre: ''}, mes_fin:"", mes_inicio:"", nombre:'no hay educacion cargada'})
        console.log(this.educacion);
      }
    })
  }

  // traer educacion id
  traerEdu(id: number){
    console.log(id);    
    this.portfolioService.obtenerEdu(id).subscribe(data=>{
      console.log(data);
      this.educacion = data;
      console.log(this.educacion);
    })
  }
  
  resetForm(){
    this.educacionForm.reset();
    this.portfolioService.cargarAnio();
  }

  // cargarEducacion2(id:number){
  //   this.portfolioService.obtenerEdu(id).subscribe()
  // }

  initForm(edu?:any):FormGroup {
    return this.formBuilder.group({
      id: [edu?.id],
      nombre: [edu?.nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      mes_inicio:[edu?.mes_inicio, [Validators.required, Validators.maxLength(2)]],
      anio_inicio:[edu?.anio_inicio, [Validators.required, Validators.maxLength(4)]],
      mes_fin:[edu?.mes_fin, [Validators.nullValidator, Validators.maxLength(2)]],
      anio_fin:[edu?.anio_fin, [Validators.nullValidator, Validators.maxLength(4)]],
      certificacion:[edu?.certificacion, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      condicion:[edu?.condicion.id, [Validators.required]],
      persona:[edu?.persona.id],
    });
  }

  abrirModalEd(edu:any):void{
    this.educacionForm = this.initForm(edu);
    this.portfolioService.cargarAnio();
  }

  reload() {
    this.ngOnInit();
  }

  editarEducacion(edu:any):void{
    this.educacionForm.controls['condicion'].setValue({id: Number(this.educacionForm.value.condicion)})
    this.educacionForm.controls['persona'].setValue({id: Number(this.educacionForm.value.persona)})
    edu=this.educacionForm.value;
    // console.log(edu);
    this.portfolioService.editarEdu(edu).subscribe(data => {
      this.resp = data
      console.log(this.resp);
      if(this.resp == 200){
        return data = data;
      } else {
        this.resp='error';        
        return data=this.resp;
      }
    })
  }

  nuevoEducacion():void{
    this.educacionForm.controls['condicion'].setValue({id: Number(this.educacionForm.value.condicion)})
    this.educacionForm.controls['persona'].setValue({id: Number(this.portfolioService.userI)})
    console.log('entre nuevoEducacion Educacions');
    console.log('Form->', this.educacionForm.value);
    this.portfolioService.nuevoEdu(this.educacionForm.value).subscribe(data => {
      this.resp = data
      // console.log(this.resp);
      if(this.resp == 200){
        return data = data;
      } else {
        this.resp='error';        
        return data=this.resp;
      }
    })
  }

  eliminarEducacion(id:number){
    this.educacionForm.controls['id'].setValue(id)
    this.portfolioService.eliminarEdu(this.educacionForm.value.id).subscribe(
      data => {
      this.resp = data
      if(this.resp == 200){
        return this.resp;
      } else {
        this.resp='error';
        return data = this.resp;
      }
      }
    )
  }



}