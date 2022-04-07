import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
