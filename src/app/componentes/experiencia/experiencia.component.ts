import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent implements OnInit{

  experiencia:any;
  experienciaForm:FormGroup;
  resp:any='';

  mes:any[];
  anio:any [];

  esTrabajoActual:any[] = [
    {'name':'No'},
    {'name':'Si'}
  ]

  tipoEmpleo:any[] = [
    {'name':'Part-Time'},
    {'name':'Full-Time'},
    {'name':'Freelance'},
    {'name':'Monotributista'},
    {'name':'Informal'}
  ]

  constructor(private portfolioService:PortfolioService, private formBuilder:FormBuilder){}

  ngOnInit():void {
    this.mes=this.portfolioService.mes;
    this.anio=this.portfolioService.anio;
    this.portfolioService.obtenerExp().subscribe(data => {    
      // console.log(data);
      this.experiencia = data;
    })
    this.experienciaForm = this.initForm();    
    this.resp='';
  }

  initForm(exp?:any):FormGroup {
    return this.formBuilder.group({
      id: [exp?.id],
      nombre: [exp?.nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion:[exp?.descripcion, [Validators.required, Validators.minLength(5), Validators.maxLength(20000)]],
      mes_inicio:[exp?.mes_inicio, [Validators.required, Validators.maxLength(2)]],
      anio_inicio:[exp?.anio_inicio, [Validators.required, Validators.maxLength(4)]],
      mes_fin:[exp?.mes_fin, [Validators.nullValidator, Validators.maxLength(2)]],
      anio_fin:[exp?.anio_fin, [Validators.nullValidator, Validators.maxLength(4)]],
      tipo_empleo:[exp?.tipo_empleo.id, [Validators.required]],
      es_trabajo_actual:[exp?.es_trabajo_actual, [Validators.required]],
      persona:[exp?.persona.id],
    });
  }

  resetForm(){
    this.experienciaForm.reset();
    this.portfolioService.cargarAnio();
  }

  reload() {
    this.ngOnInit();
  }

  abrirModal(exp:any):void{
    this.experienciaForm = this.initForm(exp);
    this.portfolioService.cargarAnio();
  }
  
  editarExperiencia(exp:any){
    this.experienciaForm.controls['persona'].setValue({id: Number(this.experienciaForm.value.persona)})
    this.experienciaForm.controls['tipo_empleo'].setValue({id: Number(this.experienciaForm.value.tipo_empleo)})
    exp=this.experienciaForm.value
    // console.log('Form->', exp);
    this.portfolioService.editarExp(exp).subscribe(data => {
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

  nuevoExperiencia():void{
    this.experienciaForm.controls['tipo_empleo'].setValue({id: Number(this.experienciaForm.value.tipo_empleo)})
    this.experienciaForm.controls['persona'].setValue({id: Number(1)})
    // console.log('Form->', this.experienciaForm.value);
    // console.log('entre nuevoExperiencia Experiencias');
    this.portfolioService.nuevoExp(this.experienciaForm.value).subscribe(data => {
      this.resp = data
      console.log(this.resp);
      if(this.resp == 200){
        return data = data;
      } else {
        this.resp='error';
        return data = this.resp;
      }
    })
  }

  eliminarExperiencia(id:number){
    this.experienciaForm.controls['id'].setValue(id)
    this.portfolioService.eliminarEdu(this.experienciaForm.value.id).subscribe(
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
