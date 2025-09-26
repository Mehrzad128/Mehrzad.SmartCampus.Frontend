import { Component, inject, signal } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AdminAuthService, LoginResponse } from '../../../+services/admin-auth-service/admin-auth-service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBar,
  ],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {
  protected readonly value = signal('');

  private fb = inject(FormBuilder);
  private auth = inject(AdminAuthService);
  private router = inject(Router);

  errorMessage = '';
  loading = false;
  requiresMfa = false;
  emailForMfa = '';

  loginForm = this.fb.group({
    email: ['', [Validators.email]],
    password: [''],
  });

  mfaForm = this.fb.group({
    otp: [''],
  });

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

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
    this.auth.login(email!, password!).subscribe({
      next: (res) => {
        if (res.requiresMfa) {
          // Step 1 complete, now show MFA form
          this.requiresMfa = true;
          this.emailForMfa = this.loginForm.value.email!;
          this.loading = false;
        } else {
          this.handleLoginResponse(res);
        }
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  verifyMfa() {
    if (this.mfaForm.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    const payload = {
      email: this.emailForMfa,
      otp: this.mfaForm.value.otp,
    };

    this.auth.verifyMfa(this.emailForMfa, this.mfaForm.value.otp!).subscribe({
      next: (res) => this.handleLoginResponse(res),
      error: () => {
        this.errorMessage = 'Invalid or expired code';
        this.loading = false;
      },
    });
  }

  private handleLoginResponse(res: LoginResponse) {
    if (!res.token || res.role!='Admin' ) {
      this.errorMessage = 'Access denied. Admins only';
      this.loading = false;
      return;
    }

    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    this.router.navigate(['/admin/dashboard']);
  }
}
