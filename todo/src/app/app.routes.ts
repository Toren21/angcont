import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ClientsComponent } from './pages/clients/clients.component';'';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children:[
    {
      path : 'clients',
      component: ClientsComponent,
      canActivate: [AuthGuard]
    }
 ]
},
{ path: '', redirectTo: 'login', pathMatch: 'full' }

];
