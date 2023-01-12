import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/Auth/auth.service';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})

export class HeaderComponent {
  persona:any;  
  url:string = "http://localhost:8080/api/";

  constructor(private http:HttpClient, protected portfolioService:PortfolioService, protected authService:AuthService) { }

  ngOnInit(): void {
    this.authService;
  }

  obtenerDatos():Observable<any> {
    return this.http.get(this.url+"ver/personas");
  }
    
}
