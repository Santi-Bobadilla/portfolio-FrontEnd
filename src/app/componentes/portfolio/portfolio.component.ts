import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent{
  recargar:number = 0;
  constructor(private portfolioService:PortfolioService) { }

}
