import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, RouterModule, Routes } from '@angular/router'; // Asigură-te că importi RouterModule
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostTaskComponent } from './components/post-task/post-task.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { ViewTaskDetailsComponent } from './components/view-task-details/view-task-details.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';


const routes: Routes = [
  { path: "dashboard", component: AdminDashboardComponent },
  { path: "panel", component: AdminPanelComponent },          // ✅ Adăugat
  { path: "task/post", component: PostTaskComponent },
  { path: "task/:id/edit", component: UpdateTaskComponent },
  { path: "task/:id/view", component: ViewTaskDetailsComponent },
];


@NgModule({
  declarations: [
        
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Modifică aici cu RouterModule.forChild
  ],
  providers: [provideRouter(routes)]
})
export class AdminModule {}
