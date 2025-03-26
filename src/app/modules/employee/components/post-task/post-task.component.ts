 import { Component } from '@angular/core';
  import { Router, RouterModule } from '@angular/router';
import { AdminService } from '../../../admin/services/admin.service';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-post-task',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.scss'
})
export class PostTaskComponent {

  postTaskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ["LOW", "MEDIUM", "HIGH"];

  
  constructor(private service: AdminService,
    private fb: FormBuilder,
    private router:Router,
    private snackbar: MatSnackBar
  ){}

  ngOnInit(){
    this.postTaskForm=this.fb.group(
      {
        employeeId:[null,[Validators.required]],
        title:[null,[Validators.required]],
        dueDate:[null,[Validators.required]],
        description:[null,[Validators.required]],
        priority:[null,[Validators.required]],

      })
    this.getUsers();
  }

  getUsers(){
    this.service.getUsers().subscribe((res) => {
      this.listOfEmployees = res;
    })
  }

  postTask(){
    this.service.postTask(this.postTaskForm.value).subscribe((res) =>{
      console.log(res);
      if(res.id != null ){
        this.router.navigateByUrl("/admin/dashboard");
        this.snackbar.open('Task posted successfully', 'Close', { duration: 5000});
      }else{
        this.snackbar.open('Something went wrong', 'Error', {duration:5000});

      }
      })
    }
  }

