import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeedashboardRoutingModule } from './employeedashboard-routing.module';
import { EmployepanelComponent } from './employepanel/employepanel.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployepanelComponent
  ],
  imports: [
    CommonModule,
    EmployeedashboardRoutingModule,
    FormsModule
  ]
})
export class EmployeedashboardModule { }
