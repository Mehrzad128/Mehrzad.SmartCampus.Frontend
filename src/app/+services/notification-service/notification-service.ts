import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private defaultConfig: MatSnackBarConfig = {
    duration: 5000,
    verticalPosition: 'top'
  };

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string) {
    this.snackBar.open(message, 'OK', {
      ...this.defaultConfig,
      panelClass: ['snack-success']
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      ...this.defaultConfig,
      panelClass: ['snack-error']
    });
  }

  showInfo(message: string) {
    this.snackBar.open(message, 'Got it', {
      ...this.defaultConfig,
      panelClass: ['snack-info']
    });
  }
}