import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { mergeMap } from 'rxjs';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit{

  constructor(private portfolioService:PortfolioService, private router:Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    //trae mail e id
    this.portfolioService.userE()
    this.urlActual();
    this.portfolioService.obtenerDatosPorUsername(this.portfolioService.currentRoute)
    if (this.portfolioService.user!=null) {
      this.portfolioService.verifyEdit();
      this.portfolioService.redes(this.portfolioService.user); 
    }
  }

  urlActual(){
    this.route.url.subscribe((event) => {
      this.portfolioService.currentRoute=event[0].path;
    });
  }
  
}
