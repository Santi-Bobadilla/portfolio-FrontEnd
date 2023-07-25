import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs';
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
  resp:any;
  provincias:any[];
  userId:any;
  
  constructor(protected authService: AuthService, protected portfolioService:PortfolioService, private fb:FormBuilder, private router:Router) {
    
  }

  ngOnInit(): void {
    this.provincias = this.portfolioService.provincias;
    this.portfolioService.obtenerDatos(this.portfolioService.user).subscribe(data=>{
      console.log(data.length);
      this.persona = data;
      console.log(this.persona);
    })

    this.persona=this.portfolioService.header;
    this.personaForm = this.initForm();
    this.resp='';
    this.portfolioService.getLoggIn();
    // console.log(this.authService.getLoggIn());
    // this.userId = sessionStorage.getItem('userId')
    // console.log(this.userId)
    // // header
    // this.portfolioService.obtenerDatos(this.portfolioService.user).pipe(
    //   mergeMap((res:any)=>
    //     this.portfolioService.obtenerEdu(res[0].id),
    //   )
    // ).subscribe(data=>{
    //   console.log(data);
    //   this.portfolioService.educacion = data;
    //   console.log(this.portfolioService.educacion);
    // })
  }
  
  initForm(pers?:any):FormGroup {
    return this.fb.group({
      id: [pers?.id, [Validators.required]],
      nombre: [pers?.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      apellido:[pers?.apellido, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      fecha_nacimiento: [pers?.fecha_nacimiento, [Validators.required, Validators.maxLength(10)]],
      email:[pers?.email, [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(100)]],
      telefono:[pers?.telefono, [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      sobre_mi:[pers?.sobre_mi, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      ocupacion:[pers?.ocupacion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      image_background_header:[pers?.image_background_header, [Validators.nullValidator, Validators.minLength(10), Validators.maxLength(20000)]],
      image_perfil:[pers?.image_perfil, [Validators.required, Validators.minLength(10), Validators.maxLength(20000)]],
      provincia:[pers?.provincia.id, [Validators.required]]
    });
  }
  

  abrirModalP(pers:any):void{
    this.personaForm = this.initForm(pers);
  }

  editarPersona(id:number, pers:any):void{
    this.personaForm.controls['provincia'].setValue({id: Number(this.personaForm.value.provincia), nacionalidad:{id:1, nombre:'Argentina'}})
    id = this.personaForm.value.id;
    pers = this.personaForm.value;
    // console.log(pers); 
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
