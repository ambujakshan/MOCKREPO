import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AddnewwmployeComponent } from './addnewwmploye/addnewwmploye.component';
import { AssignreviewComponent } from './assignreview/assignreview.component';

const routes: Routes = [

  {
    path:'',
    component:AdminpanelComponent
  },
  {
    path:'add',
    component:AddnewwmployeComponent
  },
  { path: 'edit-employee', component: AddnewwmployeComponent } ,
  // Remove id param, we'll pass data directly
  { path: 'assignreviewers', component: AssignreviewComponent } 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmindashboardRoutingModule { }
