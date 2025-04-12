import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { EmployeeService } from '../../services/employee.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-task-details-employee',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './view-task-details-employee.component.html',
  styleUrl: './view-task-details-employee.component.scss'
})
export class ViewTaskDetailsEmployeeComponent {

   id:number = this.activatedRoute.snapshot.params['id'];
  commentForm!: FormGroup;
  taskData:any;
  comments : any;
    
  constructor(private service: EmployeeService,
    private fb: FormBuilder,
    private router:Router,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute 
  ){ }
  
    ngOnInit() { 
      this.commentForm=this.fb.group({
      content:[null, [Validators.required]],
        })
      this.getTaskById();
    }

    getTaskById(){
      this.service.getTaskbyId(this.id).subscribe((res) => {
        console.log(res);
        this.taskData = res;
        this.getCommentstTaskId()
        
      })
    }

    publishComment(){
      this.service.createComment(this.id, this.commentForm.get('content')?.value).subscribe((res) =>{
        console.log(res);
        if(res.id != null ){
        
         this.snackbar.open('Commentposted successfully', 'Close', { duration: 5000});
        this.getCommentstTaskId();
        } else{

          this.snackbar.open('Something went wrong', 'Error', {duration:5000});
  
        }
        })
      } 
    

    getCommentstTaskId(){
      this.service.getCommentsByTaskId(this.id).subscribe((res) => {
        console.log(res);
        this.comments = res;
        
      })
    }
}
