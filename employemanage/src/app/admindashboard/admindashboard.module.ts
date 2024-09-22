import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AddnewwmployeComponent } from './addnewwmploye/addnewwmploye.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignreviewComponent } from './assignreview/assignreview.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AdminpanelComponent,
    AddnewwmployeComponent,
    AssignreviewComponent
  ],
  imports: [
    CommonModule,
    AdmindashboardRoutingModule,
    ReactiveFormsModule,
    
    NgSelectModule,

  ]
})
export class AdmindashboardModule { }
