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

  constructor(protected portfolioService:PortfolioService, private formBuilder:FormBuilder) {}

  ngOnInit(){
    this.portfolioService.obtenerEdu().subscribe(data => {
      console.log(data);
      this.educacion = data;
    });

    this.educacionForm = this.initForm();
  }

  
  initForm(edu?:any):FormGroup {
    return this.formBuilder.group({
      id: [edu?.id],
      nombre: [edu?.nombre],
      fecha_inicio:[edu?.fecha_inicio],
      fecha_fin:[edu?.fecha_fin],
      certificacion:[edu?.certificacion],
      condicion_id:[edu?.condicion_id],
      persona_id:[edu?.persona_id]
    });
  }

  abrirModalEd(Edu:any):void{
    this.educacionForm = this.initForm(Edu);
  }

  editarEducacion(Edu:any):void{
    console.log('Form->', this.educacionForm.value);
    this.portfolioService.editarEdu(this.educacionForm.value).subscribe(data => {
      return data = data
    })
  }

  nuevoEducacion():void{
    console.log('Form->', this.educacionForm.value);
    console.log('entre nuevoEducacion Educacions');
    this.portfolioService.nuevoEdu(this.educacionForm.value).subscribe(data => {
      return data = data
    })
  }

  eliminarEducacion(id:number){
    this.portfolioService.eliminarEdu(id).subscribe(data => {
      return data=data;
    })
  }



}
