import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsuariosComponent } from './components/list-usuarios/list-usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { EditUsuarioComponent } from './components/edit-usuario/edit-usuario.component';
import { AuthGuardService } from './guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: ListUsuariosComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'edit-usuario', component: EditUsuarioComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
