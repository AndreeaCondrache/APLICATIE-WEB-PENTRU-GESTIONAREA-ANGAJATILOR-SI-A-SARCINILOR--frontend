import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [ SharedModule,RouterModule],
  templateUrl:'./update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {

    id:number =this.activatedRoute.snapshot.params['id'];
   updateTaskForm!: FormGroup;
    listOfEmployees: any = [];
    listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];
    listOfTaskStatus: any = ["PENDING", "INPROGRESS", "COMPLETED","DEFERRED","CANCELLES"];
  
    
    constructor(private service: AdminService,
      private fb: FormBuilder,
      private router:Router,
      private snackbar: MatSnackBar,
      private activatedRoute: ActivatedRoute 
    ){ }
  
    ngOnInit() {
      this.updateTaskForm=this.fb.group({
          employeeId:[null,[Validators.required]],
          title:[null,[Validators.required]],
          dueDate:[null,[Validators.required]],
          description:[null,[Validators.required]],
          priority:[null,[Validators.required]],
          taskStatus:[null,[Validators.required]],
        })
      this.getTaskById();
    }
  
    getUsers(){
      this.service.getUsers().subscribe((res) => {
        console.log(res);
        this.listOfEmployees = res;
      })
    }
  
    getTaskById(){
      this.service.getTaskbyId(this.id).subscribe((res) => {
        console.log(res);
        this.getUsers();
        this.updateTaskForm.patchValue(res);
        
      })
    }

    updateTask(){
      this.service.updatetask(this.id,this.updateTaskForm.value).subscribe((res) =>{
        console.log(res);
        if(res.id != null ){
          this.router.navigateByUrl("/admin/dashboard");
          this.snackbar.open('Task updated successfully', 'Close', { duration: 5000});
        }else{
          this.snackbar.open('Something went wrong', 'Error', {duration:5000});
  
        }
     })
}
}
