import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { HeaderComponent } from 'src/app/componentes/header/header.component';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService implements OnInit{

  persona: any;
  constructor(private authService:AuthService, private header:HeaderComponent) { }

  ngOnInit(): void {

  }

  
  
}
