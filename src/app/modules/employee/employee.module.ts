import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, Routes,RouterModule } from '@angular/router';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { ViewTaskDetailsEmployeeComponent } from './components/view-task-details-employee/view-task-details-employee.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';


const routes : Routes = [
  { path: "dashboard", component: EmployeeDashboardComponent },
  { path: "task/:id/view", component: ViewTaskDetailsEmployeeComponent },
  { path: 'profile', component: EmployeeProfileComponent } // ✅ aici!
] 

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes), // Modifică aici cu RouterModule.forChild
     
  ],
   providers : [provideRouter(routes)]
})
export class EmployeeModule { }
