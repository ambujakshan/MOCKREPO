import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },


  {
    path:'admin',
    loadChildren: () => import('./admindashboard/admindashboard.module').then(m => m.AdmindashboardModule),
    canActivate: [AuthGuard],  // Protect this route with AuthGuard
    data: { role: 'admin' }  
  },
  {
    path:'employee',
    loadChildren: () => import('./employeedashboard/employeedashboard.module').then(m => m.EmployeedashboardModule),
    canActivate: [AuthGuard], 
    data: { role: 'employee' }  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
