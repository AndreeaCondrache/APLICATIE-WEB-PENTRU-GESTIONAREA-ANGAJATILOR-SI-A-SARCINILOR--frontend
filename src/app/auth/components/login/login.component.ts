import { Component } from '@angular/core';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { SharedModule } from '../../../shared/shared/shared.module';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage/storage.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // ✅ Adaugă importul



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls:['./login.component.scss']
})
export class LoginComponent {

  loginForm!:FormGroup;
 hidePassword:boolean = true;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private snackbar: MatSnackBar,
    private router : Router

  ){}

    ngOnInit(){
      this.loginForm =this.fb.group({
        password:[null, [Validators.required]],
        email:[null, [Validators.required, Validators.email]],
      });
    }

togglePasswordVisibility(){ 
  this.hidePassword = !this.hidePassword;
  }

  // Funcție pentru login
  login() {
    if (this.loginForm.invalid) {
      this.snackbar.open("Please fill in all fields correctly!", "Close", { duration: 5000, panelClass: 'error-snackbar' });
      return;
    }

    // Apel API login
    this.service.login(this.loginForm.value).subscribe((res) => {
      console.log(res);

      if (res.userId != null) {
        // Salvează informațiile utilizatorului în Storage
        const user = {
          id: res.userId,
          role: res.userRole,
          name: res.userName // ← Asigură-te că backendul trimite și numele!
        };
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);

        // Redirecționează în funcție de rolul utilizatorului
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("/admin/dashboard");
        } else if (StorageService.isEmployeeLoggedIn()) {
          this.router.navigateByUrl("/employee/dashboard");
        }
      } else {
        this.snackbar.open("Invalid credentials!", "Close", { duration: 5000, panelClass: 'error-snackbar' });
      }
    }, error => {
      // Gestionarea erorilor în caz de API failure
      this.snackbar.open("An error occurred. Please try again later.", "Close", { duration: 5000, panelClass: 'error-snackbar' });
    });
  }

}
