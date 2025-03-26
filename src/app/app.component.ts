import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SharedModule } from './shared/shared/shared.module';
import { StorageService } from './auth/services/storage/storage.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule,RouterOutlet, 
     MatSlideToggleModule,
    RouterModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'licenta_angular';

  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  isEmployeeLoggedIn: boolean = StorageService.isEmployeeLoggedIn();
  
  constructor(private router: Router) {}

  // Funcția isHomePage este acum în afacerea metodei ngOnInit
  isHomePage(): boolean {
    return this.router.url === '/';
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
      this.isEmployeeLoggedIn = StorageService.isEmployeeLoggedIn();
    });
  }

  logout() {
    StorageService.signout();
    this.router.navigateByUrl("/login");
  }
}
