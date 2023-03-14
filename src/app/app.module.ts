import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HardSoftSkillComponent } from './componentes/hard-soft-skill/hard-soft-skill.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { RegisterComponent } from './componentes/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './servicios/Interceptor/auth.interceptor';
import { PortfolioService } from './servicios/Portfolio/portfolio.service';
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LoaderComponent } from './componentes/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';

import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ExperienciaComponent,
    EducacionComponent,
    HardSoftSkillComponent,
    ProyectosComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    PortfolioComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeLinecap: 'butt',
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 100,
      responsive: true,
      unitsFontSize: '36',
      titleFontSize:'36',
      titleColor:'black',
      unitsColor:'black',
      subtitle:''
    }),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    DragDropModule,
    MatMenuModule
  ],
  providers: [PortfolioService,
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor,multi: true}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
