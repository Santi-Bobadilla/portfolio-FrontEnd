import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent {

  educacion:any;

  constructor(private portfolioService:PortfolioService) {}

  ngOnInit(){
    this.portfolioService.obtenerEdu().subscribe(data => {
      this.educacion = data;
    });
  }
}
