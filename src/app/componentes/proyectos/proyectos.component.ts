import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    
  constructor(protected portfolioService:PortfolioService, private formBuilder:FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.portfolioService.obtenerProy().subscribe(data => {
      this.proyectos=data;
    })

    this.proyectoForm = this.initForm();
  }

  initForm(proy?:any):FormGroup {
    return this.formBuilder.group({
      id: [proy?.id],
      nombre: [proy?.nombre],
      descripcion:[proy?.descripcion],
      fecha_inicio:[proy?.fecha_inicio],
      fecha_fin:[proy?.fecha_fin],
      link:[proy?.link],
      url_image:[proy?.url_image]
    });
  }

  abrirModal(proy:any):void{
    this.proyectoForm = this.initForm(proy);
  }

  editarProyecto(proy:any):void{
    console.log('Form->', this.proyectoForm.value);
    this.portfolioService.editarProy(this.proyectoForm.value).subscribe(data => {
      console.log(data);
      return data = data
    })
  }

  nuevoProyecto():void{
    console.log('Form->', this.proyectoForm.value);
    console.log('entre nuevoProyecto proyectos');
    this.portfolioService.nuevoProy(this.proyectoForm.value).subscribe(data => {
      return data = data
    })
  }

  eliminarProyecto(id:number){
    this.portfolioService.eliminarProy(id).subscribe(data => {
      return data=data;
    })
  }


}