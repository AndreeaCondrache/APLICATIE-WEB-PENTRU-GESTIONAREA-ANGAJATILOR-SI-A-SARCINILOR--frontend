
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AdminPanelComponent } from './modules/admin/components/admin-panel/admin-panel.component';
import { PostTaskComponent } from './modules/admin/components/post-task/post-task.component';


export const routes: Routes = [
     {path:"login",component:LoginComponent},
     {path:"register",component:SignupComponent},
     {path:"admin", loadChildren: () => import("./modules/admin/admin.module").then(e => e.AdminModule)},
     {path:"employee", loadChildren: () => import("./modules/employee/employee.module").then(e => e.EmployeeModule)},
     {path: 'admin/panel/add-employee',loadComponent: () => import('./modules/admin/components/add-employee/add-employee.component').then(m => m.AddEmployeeComponent)},
     {path: 'admin/employees',loadComponent: () =>   import('./modules/admin/components/manage-employee/manage-employee.component') .then(m => m.ManageEmployeeComponent) }
          
];

