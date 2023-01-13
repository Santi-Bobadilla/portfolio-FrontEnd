import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/Auth/auth.service';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})

export class HeaderComponent {
  
  persona:any;

  constructor(protected authService: AuthService, protected portfolioService:PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.obtenerDatos().subscribe(data => {
      console.log("Datos: "+JSON.stringify(data));
      this.persona = data;
    });

  }
    
}
