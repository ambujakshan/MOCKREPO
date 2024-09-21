import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeedashboardRoutingModule } from './employeedashboard-routing.module';
import { EmployepanelComponent } from './employepanel/employepanel.component';


@NgModule({
  declarations: [
    EmployepanelComponent
  ],
  imports: [
    CommonModule,
    EmployeedashboardRoutingModule
  ]
})
export class EmployeedashboardModule { }
