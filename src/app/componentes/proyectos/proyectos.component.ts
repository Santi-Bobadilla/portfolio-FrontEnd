import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  mes:any[] = ['01','02','03','04','05','06','07','08','09','10','11','12']
  anio:any [] = [];
  anio0:any=1960
  anio1:any=2023

  mISelect:any;
  aISelect:any;
  mFSelect:any;
  aFSelect:any;
  
  constructor(protected portfolioService:PortfolioService, private formBuilder:FormBuilder) {}

  cargarAnio(){
    for (let index = this.anio1; index >= this.anio0; index--) {
      this.anio.push(index);
    }
    return this.anio;
  }

  ngOnInit(): void {
    this.portfolioService.obtenerProy().subscribe(data => {
      this.proyectos=data;
      console.log(this.proyectos);
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
      mes_inicio:[proy?.mes_inicio],
      anio_inicio:[proy?.anio_inicio],
      mes_fin:[proy?.mes_fin],
      anio_fin:[proy?.anio_fin],
      link:[proy?.link],
      url_image:[proy?.url_image],
      persona:[this.persona.value[0]],
      // persona_id:[proy?.persona_id]
    });
  }

  abrirModal(proy:any):void{
    this.proyectoForm = this.initForm(proy);
    this.mISelect=proy?.mes_inicio;
    this.mFSelect=proy?.mes_fin;
    this.aISelect=proy?.anio_inicio;
    this.aFSelect=proy?.anio_fin;
  }

  reload() {
    this.ngOnInit();
  }

  editarProyecto(proy:any){
    console.log('Form->', this.proyectoForm.value);
    proy=this.proyectoForm.value
    this.portfolioService.editarProy(proy).subscribe(data => {
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