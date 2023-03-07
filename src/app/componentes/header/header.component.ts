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

  ngSelect:any;
  options:any[] = 
  [
    {'name':'Buenos Aires'},
    {'name':'Catamarca'},
    {'name':'Chaco'},
    {'name':'Chubut'},
    {'name':'Córdoba'},
    {'name':'Corrientes'},
    {'name':'Entre Rios'},
    {'name':'Formosa'},
    {'name':'Jujuy'},
    {'name':'La Pampa'},
    {'name':'La Rioja'},
    {'name':'Mendoza'},
    {'name':'Misiones'},
    {'name':'Neuquen'},
    {'name':'Rio Negro'},
    {'name':'Salta'},
    {'name':'San Juan'},
    {'name':'San Luis'},
    {'name':'Santa Cruz'},
    {'name':'Santa Fe'},
    {'name':'Santiago del Estero'},
    {'name':'Tierra del Fuego'},
    {'name':'Tucuman'},
    {'name':'Ciudad Autonoma de Buenos Aires'}
  ]

  resp:any;

  constructor(protected authService: AuthService, private portfolioService:PortfolioService, private fb:FormBuilder, private router:Router) {
    
  }

  ngOnInit(): void {    
    this.portfolioService.obtenerDatos().subscribe(data => {
      // console.log(data);
      this.persona = data;
    });

    this.personaForm = this.initForm();
    this.resp='';
  }

  public nac = new FormArray([
    new FormControl({id:1, nombre:'Argentina'}),
  ]);

  public provincia = new FormArray([
    new FormControl({id:0,
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
      provincia:[pers?.provincia.id]
    });
  }
  

  abrirModalP(pers:any):void{
    this.personaForm = this.initForm(pers);
    this.ngSelect=pers?.provincia.id
  }

  editarPersona(id:number, pers:any):void{
    this.personaForm.controls['provincia'].setValue({id: Number(this.personaForm.value.provincia), nacionalidad:{id:1, nombre:'Argentina'}})
    id = this.personaForm.value.id;
    pers = this.personaForm.value;
    this.portfolioService.editarPers(id, pers).subscribe(data => {
      this.resp = data
      // console.log(this.resp);
      if(this.resp == 200){
        return data = data;
      } else {
        this.resp='error';        
        return data=this.resp;
      }
    });
  }

  reload() {
    this.ngOnInit();
  }
    
}
