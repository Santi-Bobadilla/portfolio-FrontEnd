import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit{

  constructor(private portfolioService:PortfolioService) { }
  
  ngOnInit(): void {
    //trae mail e id
    this.portfolioService.userE()
    // // carga año para formulario
    // this.portfolioService.cargarAnio();
    // // header
    // this.portfolioService.obtenerDatos(this.portfolioService.user).subscribe(data=>{
    //   console.log(data);
    //   this.portfolioService.header = data;
    //   console.log(this.portfolioService.header);
    // })
    // //educacion
    // this.portfolioService.obtenerEdu(this.portfolioService.userI).subscribe(data=>{
    //   console.log(data);
    //   this.portfolioService.educacion = data;
    //   console.log(this.portfolioService.educacion);
    // })

  }

}
