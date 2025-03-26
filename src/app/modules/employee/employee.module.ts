import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, Routes,RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';


const routes : Routes = [
  { path: "dashboard", component: EmployeeDashboardComponent },
  { path: "task/:id/view", component: ViewTaskDetailsComponent },
] 

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes), // Modifică aici cu RouterModule.forChild
     
  ],
   providers : [provideRouter(routes)]
})
export class EmployeeModule { }
