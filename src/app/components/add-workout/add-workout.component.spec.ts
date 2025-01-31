import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AddWorkoutComponent } from './add-workout.component';
import { AddWorkoutService } from '../../services/add-workout/add-workout.service';
import { of } from 'rxjs';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let addWorkoutServiceSpy: jasmine.SpyObj<AddWorkoutService>;
  let dialog: MatDialog;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AddWorkoutService', ['addWorkout']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        AddWorkoutComponent, 
      ],
      providers: [{ provide: AddWorkoutService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    addWorkoutServiceSpy = TestBed.inject(
      AddWorkoutService
    ) as jasmine.SpyObj<AddWorkoutService>;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form after submission', async () => {
    addWorkoutServiceSpy.addWorkout.and.returnValue(true); 

    component.name = 'Test User';
    component.workoutMinutes = 60;
    component.workoutTypes = 'Cycling';
    fixture.detectChanges();

    await fixture.whenStable();

    const form = {
      valid: true,
      resetForm: jasmine.createSpy('resetForm'),
    } as unknown as NgForm;
    component.onSubmit(form);

    expect(component.name).toBeNull();
    expect(component.workoutMinutes).toBeNull();
    expect(component.workoutTypes).toBeNull();
    expect(form.resetForm).toHaveBeenCalled();
  });

  it('should open dialog on openDialog call', () => {
    const dialogSpy = spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<typeof component>);
    component.openDialog();
    expect(dialogSpy).toHaveBeenCalled();
  });
});
