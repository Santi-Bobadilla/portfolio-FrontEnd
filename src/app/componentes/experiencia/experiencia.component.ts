import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent {

  experiencia:any;
  experienciaForm:FormGroup;
  resp:any='';

  mes:any[] = ['01','02','03','04','05','06','07','08','09','10','11','12']
  anio:any [] = [];
  anio0:any=1960
  anio1:any=2023

  mISelect:any;
  aISelect:any;
  mFSelect:any;
  aFSelect:any;

  esTrabajoActual:any[] = [
    {'name':'No'},
    {'name':'Si'}
  ]
  etaSelect:any;

  tipoEmpleo:any[] = [
    {'name':'Part-Time'},
    {'name':'Full-Time'},
    {'name':'Freelance'},
    {'name':'Monotributista'},
    {'name':'Informal'}
  ]
  teSelect:any;

  constructor(private portfolioService:PortfolioService, private formBuilder:FormBuilder){}

  ngOnInit():void {
    this.portfolioService.obtenerExp().subscribe(data => {    
      // console.log(data);
      this.experiencia = data;
    })
    this.experienciaForm = this.initForm();    
    this.resp='';
  }

  public persona = new FormArray([
    new FormControl({id:1}),
  ]);

  initForm(exp?:any):FormGroup {
    return this.formBuilder.group({
      id: [exp?.id],
      nombre: [exp?.nombre],
      descripcion:[exp?.descripcion],
      mes_inicio:[exp?.mes_inicio],
      anio_inicio:[exp?.anio_inicio],
      mes_fin:[exp?.mes_fin],
      anio_fin:[exp?.anio_fin],
      tipo_empleo:[exp?.tipo_empleo.id],
      es_trabajo_actual:[exp?.es_trabajo_actual],
      persona:[this.persona.value[0]],
      // persona_id:[exp?.persona_id]
    });
  }

  cargarAnio(){
    for (let index = this.anio1; index >= this.anio0; index--) {
      this.anio.push(index);
    }
    return this.anio;
  }

  resetForm(){
    this.experienciaForm.reset();
  }

  reload() {
    this.ngOnInit();
  }

  abrirModal(exp:any):void{
    this.experienciaForm = this.initForm(exp);
    this.mISelect=exp?.mes_inicio;
    this.mFSelect=exp?.mes_fin;
    this.aISelect=exp?.anio_inicio;
    this.aFSelect=exp?.anio_fin;
    this.etaSelect=exp?.es_trabajo_actual;
    this.teSelect=exp?.tipo_empleo.id;
  }

  
  editarExperiencia(exp:any){
    // console.log('Form->', this.experienciaForm.value);
    this.experienciaForm.controls['tipo_empleo'].setValue({id: Number(this.experienciaForm.value.tipo_empleo)})
    exp=this.experienciaForm.value
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
    let a = confirm('¿Desea realmente eliminar este Experiencia?');
    if(a==true){
      this.portfolioService.eliminarExp(id).subscribe(data => {
        this.resp = data
        console.log(this.resp);
        if(this.resp == 200){
          this.reload();
          return data = data;
        } else {
          this.resp='error';
          return data = this.resp;
        }
      })
    }
    
  }

}
