import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/Auth/auth.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent {

  constructor(protected authService: AuthService) { }
  
}
