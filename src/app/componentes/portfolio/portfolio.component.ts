import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/clases/persona';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit{
  
  persona: Persona[];

  constructor(private headerComponent:HeaderComponent) { }
  
  ngOnInit(): void {
    this.headerComponent.obtenerDatos; 
  }
}
