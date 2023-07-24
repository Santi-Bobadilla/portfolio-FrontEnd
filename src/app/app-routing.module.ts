import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { AuthGuard } from './servicios/Guard/auth.guard';
import { EditarPerfilComponent } from './componentes/editar-perfil/editar-perfil.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  // { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard] },
  { path: 'inicio', component: InicioComponent },
  { path: 'portfolio/:id', component: PortfolioComponent },
  { path: 'portfolio', component: PortfolioComponent},
  { path: 'editar/:id', component: EditarPerfilComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
