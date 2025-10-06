import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { SecurityBackendService } from '../../+services/security-backend-service/security-backend-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBar,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  errorMessage = '';
  loading = false;
  private backend = inject(SecurityBackendService);

  private router = inject(Router);

  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: ['', [Validators.email]],
    password: [''],
  });

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    const { email, password } = this.loginForm.value;
    this.backend.login(email!, password!).subscribe({
      next: (res) => {
        this.loading = false;
        if (!res.token || !res.role) {
          this.errorMessage = 'Access denied';
          this.loading = false;
          return;
        }
        if (res.role == 'Admin'){
          this.errorMessage = 'Login via adminLogin page';
          this.loading = false;
          return;
        }
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('role', res.role);
        this.router.navigate(['/' + res.role.toLowerCase() + 's/dashboard']);
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }
}
