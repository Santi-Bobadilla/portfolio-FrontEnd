import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent {

  educacion:any;
  educacionForm: FormGroup;
  resp:any;
  condition:any [] = [
    {'name': 'Finalizado'},
    {'name': 'En curso'},
    {'name': 'Abandonado'}
  ]
  mes:any[] = ['01','02','03','04','05','06','07','08','09','10','11','12']
  anio:any [] = [];
  anio0:any=1960
  anio1:any=2023
 
  constructor(protected portfolioService:PortfolioService, private formBuilder:FormBuilder) {}

  ngOnInit(){
    this.portfolioService.obtenerEdu().subscribe(data => {
      // console.log(data);
      this.educacion = data;
    });
    this.educacionForm = this.initForm();
    this.resp='';
  }

  // public persona = new FormArray([
  //   new FormControl({id:1}),
  // ]);
  
  cargarAnio(){
    for (let index = this.anio1; index >= this.anio0; index--) {
      this.anio.push(index);
    }
    return this.anio;
  }

  resetForm(){
    this.educacionForm.reset();
  }
  
  initForm(edu?:any):FormGroup {
    return this.formBuilder.group({
      id: [edu?.id],
      nombre: [edu?.nombre],
      mes_inicio:[edu?.mes_inicio],
      anio_inicio:[edu?.anio_inicio],
      mes_fin:[edu?.mes_fin],
      anio_fin:[edu?.anio_fin],
      certificacion:[edu?.certificacion],
      condicion:[edu?.condicion.id],
      persona:[edu?.persona.id],
    });
  }

  abrirModalEd(edu:any):void{
    this.educacionForm = this.initForm(edu);
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
    let a = confirm('¿Desea realmente eliminar este proyecto?');
    if(a==true){
      this.portfolioService.eliminarProy(id).subscribe(data => {
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