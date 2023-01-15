import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})

export class ExperienciaComponent {

  experiencia:any;

  constructor(private portfolioService:PortfolioService){}

  ngOnInit():void {
    this.portfolioService.obtenerExp().subscribe(data => {    
      console.log(data);
      this.experiencia = data;
    })

  }

}
