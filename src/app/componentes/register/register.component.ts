import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, mergeMap } from 'rxjs';
import { Credentials } from 'src/app/modelo/modelo';
import { AuthService } from 'src/app/servicios/Auth/auth.service';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  
  credentials: Credentials={
    email: '',
    password: ''
  };
  errorMessage:string = ''
  form: FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router, private portfolioService:PortfolioService)
 {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get Email(){
    return this.form.get("email");
  }

  get Password(){
    return this.form.get("password");
  }

  get Nombre(){
    return this.form.get("nombre");
  }

  get Apellido(){
    return this.form.get("apellido");
  }

  onEnviarReg(event:Event){
    event.preventDefault;
    console.log(this.form.value);
    this.authService.registrarse(this.form.value)
    .subscribe(
      {
        next: (next) => {
          console.log(next)
          // this.errorMessage = v.error.message
        },
        error: (e) => {
          console.log(e.error),
          this.errorMessage = e.error
        },
        complete: () => {
          console.info('complete')
          this.errorMessage = "Registro exitoso"
          // this.router.navigate(['/login'])
          // this.authService.iniciarSesion(this.form.value)
          this.authService.iniciarSesion(this.form.value.email, this.form.value.password)
            .pipe(
              mergeMap(()=>
              this.portfolioService.obtenerUserActual(this.form.value.email)
              ),
            )
            .subscribe(data=>{
              console.log(JSON.stringify(data));
              this.router.navigate(["/"+data[0].username]);
            });    
        }
      }

      
    );
    

    // this.authService.registrarse(this.form.value).subscribe(data=>{
    //   console.log(JSON.stringify(data));
    //   console.log(data);
    //   // this.router.navigate(["/portfolio"]);
    // });
  }
}
