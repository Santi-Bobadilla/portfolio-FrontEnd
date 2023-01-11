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

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.persona = [{
      "id": 1,
			"nombres": "Santiago",
			"apellido": "Bobadilla",
			"fecha_nacimiento": "14/01/1990",
			"nacionalidad": 1,
			"mail": "santiagobobadilla@gmail.com",
      "telefono": "3515213640",
			"sobre_mi": "Full Stack Developer Jr. con experiencia en diversos lenguajes de programación y freameworks.",
			"ocupación": "Full Stack Developer Jr.",
			"image_background_header": "https://fondosmil.com/fondo/19455.jpg",
			"image_perfil": "https://media.licdn.com/dms/image/D4D03AQHrWI-J-WvjRw/profile-displayphoto-shrink_200_200/0/1672043719971?e=1677715200&v=beta&t=hmu2DAPSVKjWwVQ2yMJPe-GcyMfl5rGGk8dnZ1f4W8I",
			"id_domicilio":5
    }];
  }
    
}
