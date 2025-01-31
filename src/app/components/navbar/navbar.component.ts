import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AddWorkoutComponent } from '../add-workout/add-workout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatToolbarModule, 
    MatDialogModule, 
    AddWorkoutComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public dialog: MatDialog) {}

  openAddWorkoutModal(): void {
    this.dialog.open(AddWorkoutComponent, {
      width: '400px'
    });
  }
}
