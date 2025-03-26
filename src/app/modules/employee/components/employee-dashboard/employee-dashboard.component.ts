import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../../../admin/services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { EmployeeService } from '../../services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {

  listOfTasks: any = [];

  constructor(private service:EmployeeService,
    private snachbar :MatSnackBar

  ){ }

  ngOnInit(){
    this.getTasks();
  }

  getTasks(){
    this.service.getTaskbyUserId().subscribe((res)=> {
      console.log(res);
      this.listOfTasks = res;
    })
  }

  updateStatus(id:number, status:string){
    this.service.updateTask(id,status).subscribe((res)=>{
        if(res.id != null){
          this.snachbar.open('Task update successfully', 'Close',{ duration:5000});
          this.getTasks();
        } else{
          this.snachbar.open('Something went wrong', 'Close', { duration: 5000});
        }
    })
  }

}
