import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login-component', component: LoginComponent },
  { path: 'main-component', component: MainComponent, canActivate: [AuthGuard] },
  {path: '', component: LoginComponent, canActivate: [AuthGuard] }

];
