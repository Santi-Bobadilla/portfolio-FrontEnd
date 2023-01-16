import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/Auth/auth.service';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})

export class HeaderComponent {
  
  persona:any;  
  personaForm: FormGroup;

  constructor(protected authService: AuthService, private portfolioService:PortfolioService, private fb:FormBuilder, private router:Router) {
    
  }

  ngOnInit(): void {    
    this.portfolioService.obtenerDatos().subscribe(data => {
      console.log(data);
      
      this.persona = data;
    });

    this.personaForm = this.initForm();

  }

  // public provincia = new FormControl({
  //                   id:5,
  //                   nombre:'Córdoba',
  //                   nacionalidad:new FormControl({id:1, nombre:'Argentina'})
  //                 });

  public nac = new FormArray([
    new FormControl({id:1, nombre:'Argentina'}),
  ]);

  public provincia = new FormArray([
    new FormControl({id:5,
                    nacionalidad: this.nac.value[0]
                  }),
  ]);
  
  initForm(pers?:any):FormGroup {
    return this.fb.group({
      id: [pers?.id],
      nombre: [pers?.nombre],
      apellido:[pers?.apellido],
      fecha_nacimiento: [pers?.fecha_nacimiento],
      email:[pers?.email],
      telefono:[pers?.telefono],
      sobre_mi:[pers?.sobre_mi],
      ocupacion:[pers?.ocupacion],
      image_background_header:[pers?.image_background_header],
      image_perfil:[pers?.image_perfil],
      provincia:[this.provincia.value[0]],
      // provincia_id:[pers?.provincia_id]
      provincia_id:[pers?.provincia_id]
    });
    
  }

  abrirModalP(pers:any):void{
    this.personaForm = this.initForm(pers);
  }

  editarPersona(id:number, pers:any):void{
    this.personaForm.controls['provincia'].setValue({id: Number(this.personaForm.value.provincia_id), nacionalidad:{id:1, nombre:'Argentina'}})
    id = this.personaForm.value.id;
    this.portfolioService.editarPers(id, this.personaForm.value).subscribe(data => {
      return data = data
    });
  }
    
}
