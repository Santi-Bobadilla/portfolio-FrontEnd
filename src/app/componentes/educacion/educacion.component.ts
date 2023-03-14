import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit{

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
 
  constructor(protected portfolioService:PortfolioService, private formBuilder:FormBuilder) {}  

  ngOnInit(){
    this.mes=this.portfolioService.mes;
    this.anio=this.portfolioService.anio;
    this.portfolioService.obtenerEdu().subscribe(data => {
      // console.log(data);
      this.educacion = data;
    });
    this.educacionForm = this.initForm();
    this.resp='';
  }

  resetForm(){
    this.educacionForm.reset();
    this.portfolioService.cargarAnio();
  }
  
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
    this.educacionForm.controls['persona'].setValue({id: Number(1)})
    // console.log('entre nuevoEducacion Educacions');
    // console.log('Form->', this.educacionForm.value);
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