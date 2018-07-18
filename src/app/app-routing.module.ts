import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ProjectComponent} from './components/projects/project/project.component';
import {CreateProjectComponent} from './components/projects/create-project/create-project.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'project/create', component: CreateProjectComponent},
  {path: 'project/:id', component: ProjectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
