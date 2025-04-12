import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {


  employeeForm!: FormGroup;
  departments: string[] = ['IT', 'HR', 'MARKETING', 'FINANCE','OTHER']; // adaptează după enum-ul tău

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      department: [null, [Validators.required]]
    });
  }

  submitForm() {
    if (this.employeeForm.invalid) return;

    this.adminService.addEmployee(this.employeeForm.value).subscribe({
      next: (res) => {
        this.snackbar.open('Employee added successfully', 'Close', { duration: 4000 });
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (err) => {
        console.error(err);
        this.snackbar.open('Failed to add employee', 'Close', { duration: 4000 });
      }
    });
  }
}
