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
      // this.portfolioService.userE();
      // this.portfolioService.obtenerUserActual(this.portfolioService.user).subscribe(data => {
      //   if(sessionStorage.getItem('userId')==null){        
      //     sessionStorage.setItem('userId', data[0].id);
      //   }
      //   return sessionStorage.getItem('userId');
      // })
      // this.portfolioService.userE();
      // this.portfolioService.userId(this.portfolioService.user);

      // this.portfolioService.obtenerEdu(this.portfolioService.userI).subscribe(data => {
      //   console.log(data);
      //   this.portfolioService.educacion = data;
      // });

  }

}
