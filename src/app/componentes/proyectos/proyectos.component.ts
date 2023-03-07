import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  code: number;
  mes: any[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  anio: any[] = [];
  anio0: any = 1960
  anio1: any = 2023
  responseStatus: any

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.proyectos, event.previousIndex, event.currentIndex);
  }

  constructor(protected portfolioService: PortfolioService, private formBuilder: FormBuilder) { }

  cargarAnio() {
    for (let index = this.anio1; index >= this.anio0; index--) {
      this.anio.push(index);
    }
    return this.anio;
  }

  ngOnInit(): void {
    this.portfolioService.obtenerProy().subscribe(data => {
      this.proyectos = [];
      for (let i = 0; i < data.length; i++) {
        this.proyectos.push(data[i])
      }
    })

    this.proyectoForm = this.initForm();
    console.log(this.portfolioService.responseStatus);
    
    // this.resp=this.portfolioService.responseStatus;
    this.resp = '';        
  }

  // public persona = new FormArray([
  //   new FormControl({id:1}),
  // ]);

  initForm(proy?: any): FormGroup {
    return this.formBuilder.group({
      id: [proy?.id],
      nombre: [proy?.nombre],
      descripcion: [proy?.descripcion],
      mes_inicio: [proy?.mes_inicio],
      anio_inicio: [proy?.anio_inicio],
      mes_fin: [proy?.mes_fin],
      anio_fin: [proy?.anio_fin],
      link: [proy?.link],
      url_image: [proy?.url_image],
      persona: [proy?.persona.id]
    });
  }

  abrirModal(proy: any): void {
    this.proyectoForm = this.initForm(proy);
    // console.log(this.proyectoForm.value);
  }

  reload() {
    this.ngOnInit();
  }

  resetForm() {
    this.proyectoForm.reset();
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