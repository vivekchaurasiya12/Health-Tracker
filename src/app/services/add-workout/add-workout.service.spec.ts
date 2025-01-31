// src/app/services/add-workout/add-workout.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddWorkoutService } from './add-workout.service';

describe('AddWorkoutService', () => {
  let service: AddWorkoutService;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    });
    service = TestBed.inject(AddWorkoutService);
  });

  it('should add a new workout', () => {
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    spyOn(localStorage, 'setItem');

    service.addWorkout('John Doe', 'Running', 30);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      jasmine.any(String)
    );
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Workout added successfully!',
      'Close',
      { duration: 2000 }
    );
  });

  it('should add a new workout to an existing user', () => {
    const existingUsers = JSON.stringify([
      {
        id: 1,
        name: 'John Doe',
        workouts: [],
        totalWorkouts: 0,
        totalMinutes: 0,
      },
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(existingUsers);
    spyOn(localStorage, 'setItem');

    service.addWorkout('John Doe', 'Swimming', 45);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      jasmine.any(String)
    );
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Workout added successfully!',
      'Close',
      { duration: 2000 }
    );
  });

  it('should update an existing workout for an existing user', () => {
    const existingUsers = JSON.stringify([
      {
        id: 1,
        name: 'John Doe',
        workouts: [{ type: 'Running', minutes: 30 }],
        totalWorkouts: 1,
        totalMinutes: 30,
      },
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(existingUsers);
    spyOn(localStorage, 'setItem');

    service.addWorkout('John Doe', 'Running', 20);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      jasmine.any(String)
    );
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Workout updated successfully!',
      'Close',
      { duration: 2000 }
    );
  });

  it('should not add a workout if name is null', () => {
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    spyOn(localStorage, 'setItem');

    const result = service.addWorkout(null, 'Running', 30);

    expect(result).toBeFalse();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'All fields are required!',
      'Close',
      { duration: 2000 }
    );
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should not add a workout if workoutType is null', () => {
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    spyOn(localStorage, 'setItem');

    const result = service.addWorkout('John Doe', null, 30);

    expect(result).toBeFalse();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'All fields are required!',
      'Close',
      { duration: 2000 }
    );
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should not add a workout if workoutMinutes is null', () => {
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    spyOn(localStorage, 'setItem');

    const result = service.addWorkout('John Doe', 'Running', null);

    expect(result).toBeFalse();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'All fields are required!',
      'Close',
      { duration: 2000 }
    );
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should handle invalid localStorage data gracefully', () => {
    spyOn(localStorage, 'getItem').and.returnValue('invalid data');
    spyOn(localStorage, 'setItem');

    const result = service.addWorkout('John Doe', 'Running', 30);

    expect(result).toBeTrue();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Workout added successfully!',
      'Close',
      { duration: 2000 }
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      jasmine.any(String)
    );
  });

  it('should handle adding a workout to a non-existing user', () => {
    const existingUsers = JSON.stringify([
      {
        id: 1,
        name: 'John Doe',
        workouts: [],
        totalWorkouts: 0,
        totalMinutes: 0,
      },
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(existingUsers);
    spyOn(localStorage, 'setItem');

    service.addWorkout('Jane Doe', 'Cycling', 60);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      jasmine.any(String)
    );
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Workout added successfully!',
      'Close',
      { duration: 2000 }
    );
  });

  it('should add a new workout if user is not found in localStorage', () => {
    const existingUsers = JSON.stringify([
      {
        id: 1,
        name: 'Jane Doe',
        workouts: [{ type: 'Swimming', minutes: 45 }],
        totalWorkouts: 1,
        totalMinutes: 45,
      },
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(existingUsers);
    spyOn(localStorage, 'setItem');

    service.addWorkout('John Doe', 'Running', 30);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      jasmine.any(String)
    );
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Workout added successfully!',
      'Close',
      { duration: 2000 }
    );
  });

  it('should add a new workout to an existing user with multiple workouts', () => {
    const existingUsers = JSON.stringify([
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Swimming', minutes: 45 },
        ],
        totalWorkouts: 2,
        totalMinutes: 75,
      },
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(existingUsers);
    spyOn(localStorage, 'setItem');

    service.addWorkout('John Doe', 'Cycling', 60);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      jasmine.any(String)
    );
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Workout added successfully!',
      'Close',
      { duration: 2000 }
    );
  });

  it('should handle empty localStorage gracefully', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');

    service.addWorkout('John Doe', 'Running', 30);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'workoutData',
      jasmine.any(String)
    );
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Workout added successfully!',
      'Close',
      { duration: 2000 }
    );
  });

  it('should not add a workout with empty string values', () => {
    spyOn(localStorage, 'getItem').and.returnValue('[]');
    spyOn(localStorage, 'setItem');

    let result = service.addWorkout(null, 'Running', 30);
    expect(result).toBeFalse();

    result = service.addWorkout('John Doe', null, 30);
    expect(result).toBeFalse();

    result = service.addWorkout('John Doe', 'Running', null);
    expect(result).toBeFalse();

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'All fields are required!',
      'Close',
      { duration: 2000 }
    );
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
