import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashboardRoutingModule } from './admindashboard-routing.module';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { AddnewwmployeComponent } from './addnewwmploye/addnewwmploye.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminpanelComponent,
    AddnewwmployeComponent
  ],
  imports: [
    CommonModule,
    AdmindashboardRoutingModule,
    ReactiveFormsModule

  ]
})
export class AdmindashboardModule { }
