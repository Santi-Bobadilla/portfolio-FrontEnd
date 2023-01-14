import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent {
  proyectos:any;
  proyectoForm: FormGroup;
  
  constructor(protected portfolioService:PortfolioService, private formBuilder:FormBuilder, private router:Router) {
    this.portfolioService.obtenerProy().subscribe(data => {
      this.proyectos=data;
    })
    
  }

  ngOnInit(): void {
    this.proyectoForm = this.initForm()
  }

  initForm():FormGroup {
    return this.formBuilder.group({
      id: [''],
      nombre: [''],
      descripcion:[''],
      fecha_inicio:[''],
      fecha_fin:[''],
      link:[''],
      url_image:['']
    });
  }
  
  editarProyecto(id:number):void{
    console.log(id);
    this.proyectoForm.controls['id'].setValue(id);
    console.log('Form->', this.proyectoForm.value);
    console.log('entre editProyecto proyectos');
    this.portfolioService.editarProy(this.proyectoForm.value).subscribe(data => {
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
}
