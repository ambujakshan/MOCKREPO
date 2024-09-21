import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployepanelComponent } from './employepanel/employepanel.component';

const routes: Routes = [
  {
    path:'',
    component:EmployepanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeedashboardRoutingModule { }
