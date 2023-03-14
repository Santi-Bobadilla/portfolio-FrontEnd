import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {

  proyectos: any[] = [];
  proyectoForm: any;
  resp: any;
  
  mes:any[];
  anio:any [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.proyectos, event.previousIndex, event.currentIndex);
  }

  constructor(protected portfolioService: PortfolioService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mes=this.portfolioService.mes;
    this.anio=this.portfolioService.anio;
    this.portfolioService.obtenerProy().subscribe(data => {
      this.proyectos = [];
      for (let i = 0; i < data.length; i++) {
        this.proyectos.push(data[i])
      }
    })

    this.proyectoForm = this.initForm();
    this.resp = '';        
  }

  initForm(proy?: any): FormGroup {
    return this.formBuilder.group({
      id: [proy?.id],
      nombre: [proy?.nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: [proy?.descripcion, [Validators.required, Validators.minLength(5), Validators.maxLength(20000)]],
      mes_inicio:[proy?.mes_inicio, [Validators.required, Validators.maxLength(2)]],
      anio_inicio:[proy?.anio_inicio, [Validators.required, Validators.maxLength(4)]],
      mes_fin:[proy?.mes_fin, [Validators.nullValidator, Validators.maxLength(2)]],
      anio_fin:[proy?.anio_fin, [Validators.nullValidator, Validators.maxLength(4)]],
      link: [proy?.link, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      url_image: [proy?.url_image, [Validators.required, Validators.minLength(10), Validators.maxLength(20000)]],
      persona: [proy?.persona.id]
    });
  }

  abrirModal(proy: any): void {
    this.proyectoForm = this.initForm(proy);
    this.portfolioService.cargarAnio();
  }

  reload() {
    this.ngOnInit();
  }

  resetForm() {
    this.proyectoForm.reset();
    this.portfolioService.cargarAnio();
  }

  editarProyecto(proy: any):any {
    this.proyectoForm.controls['persona'].setValue({ id: Number(this.proyectoForm.value.persona) })
    proy = this.proyectoForm.value
    // console.log('Form->', this.proyectoForm.value);
    this.portfolioService.editarProy(proy).subscribe(
      (data) => {
        this.resp = data
        // console.log(this.resp);
        if (this.resp == 200) {
          return data = data;
        } else {
          this.resp = 'error';
          return data = this.resp;
        }
      }
    )
  }

  nuevoProyecto(): void {
    this.proyectoForm.controls['persona'].setValue({ id: Number(1) })
    // console.log('Form->', this.proyectoForm.value);
    // console.log('entre nuevoProyecto proyectos');
    this.portfolioService.nuevoProy(this.proyectoForm.value).subscribe(
        data => {
        this.resp = data
        // console.log(this.resp);
        if(this.resp == 200){
          return data = data;
        } else {
          this.resp='error';
          return data = this.resp;
        }
      }
    )
  }

  eliminarProyecto(id: number) {
    // console.log('entre a eliminar proyecto ' + id);
    // console.log(this.proyectoForm.value);
    this.proyectoForm.controls['id'].setValue(id)
    this.portfolioService.eliminarProy(this.proyectoForm.value.id).subscribe(
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