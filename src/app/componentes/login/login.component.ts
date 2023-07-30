import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/Auth/auth.service';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/modelo/modelo';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';
import { mergeMap } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  credentials: Credentials={
    email: '',
    password: ''
  };

  form: FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private portfolioService:PortfolioService, private router:Router)
 {
    this.form = this.formBuilder.group({
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

  onEnviar(event:Event){
    event.preventDefault;
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
