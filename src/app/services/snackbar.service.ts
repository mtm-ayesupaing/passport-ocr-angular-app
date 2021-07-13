import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  open(message: string, duration: number = 3000, action?: string): any {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    return this.snackBar.open(message, action, config);
  }
}
