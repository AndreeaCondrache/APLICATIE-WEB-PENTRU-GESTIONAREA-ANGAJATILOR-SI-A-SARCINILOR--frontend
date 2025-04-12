import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared/shared.module';
import { EmployeeService } from '../../services/employee.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';


import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-employee-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent {

  user: any;
  taskStats = {
    total: 0,
    completed: 0,
    inProgress: 0
  };
  employeeName: string = '';
  userId!: string;
  userRole!: string;
  userName!: string; // <-- ai nevoie de asta

  constructor(private service: EmployeeService,private http: HttpClient) {}

  ngOnInit(): void {
    this.user = StorageService.getUser();
    this.employeeName = StorageService.getUserName();
    this.userId = StorageService.getUserId();
    this.userRole = StorageService.getUserRole();
    this.userName = StorageService.getUserName(); // <-- adaugă asta
    console.log("User:", StorageService.getUser()); // pentru debug
    this.loadStats();
    this.testToken(); // 👈 testează dacă tokenul e transmis corect

  }
  loadStats(): void {
    this.service.getTaskbyUserId().subscribe((tasks) => {
      this.taskStats.total = tasks.length;
      this.taskStats.completed = tasks.filter((t: any) => t.taskStatus === 'COMPLETED').length;
      this.taskStats.inProgress = tasks.filter((t: any) => t.taskStatus === 'INPROGRESS').length;
    });
  }

  testToken() {
    this.http.get('http://localhost:8080/api/auth/test', { responseType: 'text' }).subscribe({
      next: res => console.log('✅ Backend spune:', res),
      error: err => console.error('❌ Token invalid sau lipsă:', err)
    });
  
}}


  