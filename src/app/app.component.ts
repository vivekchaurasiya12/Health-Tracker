import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { UsersComponent } from './components/users/users.component';
import { userData } from './app.model';
import { ChartComponent } from './components/chart/chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatToolbarModule,
    MatTabsModule,
    CommonModule,
    MatIconModule,
    AddWorkoutComponent,
    UsersComponent,
    ChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Health-Tracker';

  @ViewChild('usersComponent') usersComponent!: UsersComponent;
  @ViewChild('chartComponent') chartComponent!: ChartComponent;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.initializeLocalStorage();
  }

  initializeLocalStorage() {
    if (!localStorage.getItem('workoutData')) {
      localStorage.setItem('workoutData', JSON.stringify(userData));
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddWorkoutComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersComponent?.loadUsers();
        this.chartComponent?.loadUsers();
      }
    });
  }

  onUserAdded() {
    this.chartComponent?.onUserAdded();
  }
}
