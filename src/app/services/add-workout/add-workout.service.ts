import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../components/users/users.component'; 
import { Workout } from '../../components/add-workout/add-workout.model'; 

@Injectable({
  providedIn: 'root',
})
export class AddWorkoutService {
  constructor(private _snackBar: MatSnackBar) {}

  addWorkout(
    name: string | null,
    workoutType: string | null,
    workoutMinutes: number | null,
  ): boolean {
    if (name === null || workoutType === null || workoutMinutes === null) {
      this.openSnackBar('All fields are required!', 'Close');
      return false;
    }

    if (workoutMinutes <= 0) {
      this.openSnackBar('Invalid workout duration!', 'Close');
      return false;
    }

    const newWorkout: Workout = {
      type: workoutType,
      minutes: workoutMinutes,
    };

    let users: User[] = JSON.parse(localStorage.getItem('workoutData') || '[]');
    let userFound = false; 

    
    users = users.map(user => {
      if (user.name === name) { 
        userFound = true;

        const workoutIndex = user.workouts.findIndex(
          (workout: Workout) => workout.type === workoutType
        );

        if (workoutIndex !== -1) { 
          user.workouts[workoutIndex].minutes += newWorkout.minutes;
        } else { 
          user.workouts.push(newWorkout);
          user.totalWorkouts += 1; 
        }

        user.totalMinutes += newWorkout.minutes;
      }
      return user; 
    });

    if (!userFound) { 
      const newUser: User = {
        id: users.length + 1,
        name: name,
        workouts: [newWorkout],
        totalWorkouts: 1,
        totalMinutes: newWorkout.minutes,
      };
      users.push(newUser); 
    }

    this.openSnackBar('Workout added successfully!', 'Close'); 
    localStorage.setItem('workoutData', JSON.stringify(users));
    return true;
  }

  private openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }
}
