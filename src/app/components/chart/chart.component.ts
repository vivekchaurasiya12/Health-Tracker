import {
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';

import { User } from '../users/users.model'
import { ChartService } from '../../services/chart/chart.service';

Chart.register(CategoryScale);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  @ViewChild('myChart') chartRef!: ElementRef<HTMLCanvasElement>;

  users: User[] = [];
  selectedUser: User | null = null;
  chart: Chart | null = null;

  constructor(
    private chartService: ChartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
      this.initializeChart();
      this.cdr.detectChanges();
    }
  }

  initializeChart() {
    if (this.users.length > 0 && this.chartRef) {
      this.selectedUser = this.users[0];
      this.chartService.createChart(
        this.chartRef.nativeElement,
        this.selectedUser
      );
      this.cdr.detectChanges();
    }
  }

  loadUsers() {
    this.users = [{ id: 1, name: 'John Doe', workouts: [], totalWorkouts: 0, totalMinutes: 0 }];
    const workoutDataString = localStorage.getItem('workoutData');
    console.log("hello", workoutDataString)
    if (workoutDataString) {
      this.users = JSON.parse(workoutDataString);
      if (!this.selectedUser && this.users.length > 0) {
        this.selectedUser = this.users[0];
        this.initializeChart();
      }
    }
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
    this.chartService.updateChart(user);
  }

  onUserAdded() {
    this.loadUsers();
    if (this.selectedUser) {
      this.chartService.updateChart(this.selectedUser);
    }
  }
}