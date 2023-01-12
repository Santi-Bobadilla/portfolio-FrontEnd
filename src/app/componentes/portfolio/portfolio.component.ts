import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';
import { Persona } from 'src/app/clases/persona';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent{
  persona: Persona[];

  constructor(private portfolioService:PortfolioService) { }

}
