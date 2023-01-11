import { Component } from '@angular/core';
import { Persona } from 'src/app/clases/persona';
import { AuthService } from 'src/app/servicios/Auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})

export class HeaderComponent {
  
  persona:Persona[]

  constructor(protected authService: AuthService) { }



  ngOnInit(): void {


  }
    
}
