import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-task',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.scss'
})
export class PostTaskComponent {

  postTaskForm!: FormGroup;
  listOfEmployees: any[] = [];
  listOfPriorities: string[] = ["LOW", "MEDIUM", "HIGH"];

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.postTaskForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      description: [null, [Validators.required]],
      priority: [null, [Validators.required]],
    });

    this.getUsers();
  }

  getUsers() {
    this.service.getUsers().subscribe((res) => {
      console.log("Loaded employees:", res);
      this.listOfEmployees = res;
    });
  }

  postTask() {
    if (this.postTaskForm.invalid) {
      this.snackbar.open('Please fill all required fields', 'Warning', { duration: 3000 });
      return;
    }

    const formData = this.postTaskForm.value;
    console.log("Form Values:", formData); // 🧪 DEBUG LOG

    this.service.postTask(formData).subscribe({
      next: (res) => {
        console.log("Task posted successfully:", res);
        if (res.id != null) {
          this.snackbar.open('Task posted successfully', 'Close', { duration: 5000 });
          this.router.navigateByUrl("/admin/dashboard");
        } else {
          this.snackbar.open('Something went wrong', 'Error', { duration: 5000 });
        }
      },
      error: (err) => {
        console.error("Error creating task:", err);
        this.snackbar.open('Failed to post task', 'Error', { duration: 5000 });
      }
    });
  }

}
