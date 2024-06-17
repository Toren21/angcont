import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ClientsComponent } from './pages/clients/clients.component';'';
import { ProjectsComponent } from './pages/projects/projects.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IncomesComponent } from './pages/incomes/incomes.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { StockComponent } from './pages/stock/stock.component';

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
    },
    {
      path: 'projects',
      component: ProjectsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'incomes',
      component: IncomesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'expenses',
      component: ExpensesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'products',
      component: StockComponent,
      canActivate: [AuthGuard]
    }
 ]
},
{ path: '', redirectTo: 'login', pathMatch: 'full' }

];
