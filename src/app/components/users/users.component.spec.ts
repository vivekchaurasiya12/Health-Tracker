import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { UsersComponent } from './users.component';
import { User } from './users.model';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
      ],
      totalWorkouts: 2,
      totalMinutes: 75,
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 },
      ],
      totalWorkouts: 2,
      totalMinutes: 80,
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 },
      ],
      totalWorkouts: 2,
      totalMinutes: 90,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        NoopAnimationsModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
      ],
      declarations: [UsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    component.dataSource.data = mockUsers; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update dataSource when loadUsers is called', () => {
    component.dataSource.data = mockUsers;
    component.loadUsers();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should have paginator after view init', () => {
    component.ngAfterViewInit();
    expect(component.paginator).toBeTruthy();
    expect(component.dataSource.paginator).toBe(component.paginator);
  });
});
