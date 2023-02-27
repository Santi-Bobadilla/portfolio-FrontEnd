import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
 
  proyectos:any;
  proyectoForm: FormGroup;
  resp:any='';
  
  constructor(protected portfolioService:PortfolioService, private formBuilder:FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.portfolioService.obtenerProy().subscribe(data => {
      this.proyectos=data;
    })

    this.proyectoForm = this.initForm();
    this.resp='';
  }

  public persona = new FormArray([
    new FormControl({id:1}),
  ]);

  initForm(proy?:any):FormGroup {
    return this.formBuilder.group({
      id: [proy?.id],
      nombre: [proy?.nombre],
      descripcion:[proy?.descripcion],
      fecha_inicio:[proy?.fecha_inicio],
      fecha_fin:[proy?.fecha_fin],
      link:[proy?.link],
      url_image:[proy?.url_image],
      persona:[this.persona.value[0]],
      // persona_id:[proy?.persona_id]
    });
  }

  abrirModal(proy:any):void{
    this.proyectoForm = this.initForm(proy);
  }

  reload() {
    this.ngOnInit();
  }

  editarProyecto(proy:any){
    console.log('Form->', this.proyectoForm.value);
    this.portfolioService.editarProy(this.proyectoForm.value).subscribe(data => {
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

  nuevoProyecto():void{
    console.log('Form->', this.proyectoForm.value);
    console.log('entre nuevoProyecto proyectos');
    this.portfolioService.nuevoProy(this.proyectoForm.value).subscribe(data => {
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

  eliminarProyecto(id:number){
    let a = confirm('¿Desea realmente eliminar este proyecto?');
    if(a==true){
      this.portfolioService.eliminarProy(id).subscribe(data => {
        this.resp = data
        console.log(this.resp);
        if(this.resp == 200){
          console.log('entre a if');
          this.reload();
          return data = data;
        } else {
          console.log('entre a else');
          this.resp='error';
          return data = this.resp;
        }
      })
    }
    
  }


}