import { Component, ElementRef, inject, signal } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {
  constructor(private el: ElementRef) {}

  readonly email = new FormControl('', [Validators.email]);
  readonly password = new FormControl('', []);

  protected readonly value = signal('');
  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  Submit() {
    if (!this.email.invalid && !this.password.invalid) {
      console.log('GG');
    } else {
      console.log('bad');
    }
  }
}
