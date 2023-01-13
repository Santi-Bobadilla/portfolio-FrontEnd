import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent {
  proyectos:any;

  proyectoForm:FormGroup;
  constructor(private portfolioService:PortfolioService, private formBuilder:FormBuilder, private router:Router) {
    this.portfolioService.obtenerProy().subscribe(data => {
      console.log("Data: "+JSON.stringify(data));
      this.proyectos=data;
    })
  }

  editarProy(id:number) {
    this.proyectoForm = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(8)]],
      fecha_inicio: ['', [Validators.required, Validators.minLength(8)]],
      fecha_fin: ['', [Validators.required, Validators.minLength(8)]],
      link: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
}
