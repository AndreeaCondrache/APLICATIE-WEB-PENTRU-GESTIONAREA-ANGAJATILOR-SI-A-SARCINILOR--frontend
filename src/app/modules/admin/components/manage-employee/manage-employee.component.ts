import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeDialogComponent } from '../edit-employee-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog.component';


@Component({
  selector: 'app-manage-employee',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule, SharedModule],
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.scss']
})
export class ManageEmployeeComponent implements OnInit {

  
  employees: any[] = [];
  filteredEmployees: any[] = [];
  selectedDepartment: string = '';
  searchName: string = '';
  selectedEmployee: any = null;
  selectedEmployeeStats = { total: 0, inProgress: 0, completed: 0 };

  departments: string[] = ['IT', 'HR', 'MARKETING', 'FINANCE', 'OTHER'];
  columns: string[] = ['name', 'email', 'department', 'actions'];

  constructor(private adminService: AdminService, private dialog: MatDialog) {}
  


  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters() {
    const params: any = {};
  
    if (this.searchName.trim()) {
      params.name = this.searchName.trim();
    }
  
    // Trimite `department` doar dacă e diferit de gol și diferit de 'ALL'
    if (this.selectedDepartment && this.selectedDepartment !== 'ALL') {
      params.department = this.selectedDepartment;
    }
  
    this.adminService.filterUsers(params).subscribe((res: any) => {
      this.filteredEmployees = res;
      this.selectedEmployee = null;
    });
  
  
    this.adminService.filterUsers(params).subscribe((res: any) => {
      this.filteredEmployees = res;
      this.selectedEmployee = null;
    });
  }
  

  onNameInputChange() {
    this.applyFilters();
  }

  onDepartmentChange() {
    this.applyFilters();
  }

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
    this.adminService.getTasks().subscribe((tasks: any[]) => {
      const userTasks = tasks.filter(t => t.userId === employee.id);
      this.selectedEmployeeStats.total = userTasks.length;
      this.selectedEmployeeStats.inProgress = userTasks.filter(t => t.taskStatus === 'INPROGRESS').length;
      this.selectedEmployeeStats.completed = userTasks.filter(t => t.taskStatus === 'COMPLETED').length;
    });
  }

  editEmployee(employee: any) {
    const dialogRef = this.dialog.open(EditEmployeeDialogComponent, {
      data: employee
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.applyFilters(); // reîncarcă angajații
      }
    });
  }
  

  deleteEmployee(employeeId: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      data: { name }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteUser(employeeId).subscribe(() => {
          this.applyFilters(); // reîncarcă lista
        });
      }
    });
  }
  

  
}