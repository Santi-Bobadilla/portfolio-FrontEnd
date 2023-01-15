import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-hard-soft-skill',
  templateUrl: './hard-soft-skill.component.html',
  styleUrls: ['./hard-soft-skill.component.css']
})

export class HardSoftSkillComponent {

  skills:any;

  constructor(private portfolioService:PortfolioService){}

  ngOnInit():void {
    this.portfolioService.obtenerSkill().subscribe(data=>{
      console.log(data);      
      this.skills = data;
    })
  }

}
