import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/servicios/Auth/auth.service';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})

export class HeaderComponent {
  
  persona:any;  
  personaForm: FormGroup;

  constructor(protected authService: AuthService, private portfolioService:PortfolioService, private fb:FormBuilder) {
    
  }

  ngOnInit(): void {    
    this.portfolioService.obtenerDatos().subscribe(data => {
      console.log(data);
      
      this.persona = data;
    });

    this.personaForm = this.initForm();

  }

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
      provincia_id: [pers?.provincia_id]
    });
    
  }

  abrirModalP(pers:any):void{
    this.personaForm = this.initForm(pers);
  }

  editarPersona(pers:any):void{
    console.log('Form->', this.personaForm.value);
    this.portfolioService.editarPers(this.personaForm.value).subscribe(data => {
      return data = data
    })
  }
    
}
