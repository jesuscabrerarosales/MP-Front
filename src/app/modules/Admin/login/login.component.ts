import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../Services/admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { LoaderComponent } from '../../Shared/components/loader/loader.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, FormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';

  constructor(private adminService: AdminService, private router: Router) {}
  error = signal<boolean>(false);
  loading = signal<boolean>(false);
  login() {
    this.loading.set(true);
    this.error.set(false);
    if (this.username.trim() && this.password.trim()) {
      this.adminService.login({ username: this.username, password: this.password }).subscribe({
        next: (response) => {
          this.adminService.saveToken(response.jwtToken);
          this.router.navigate(['/admin']);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error de login', err);
          this.error.set(true);
          this.loading.set(false);
        }
      });
    } else {
      this.error.set(true);
      this.loading.set(false);
      console.error('Debe ingresar usuario y contraseña.');
    }
  }
}
