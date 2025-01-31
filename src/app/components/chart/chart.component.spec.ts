import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ElementRef, NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let cdrMock: jasmine.SpyObj<ChangeDetectorRef>;

  const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [],
      totalWorkouts: 0,
      totalMinutes: 0,
    }
  ];

  beforeEach(async () => {
    const cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatListModule],
      declarations: [ChartComponent],
      providers: [
        { provide: ChangeDetectorRef, useValue: cdrSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    cdrMock = TestBed.inject(ChangeDetectorRef) as jasmine.SpyObj<ChangeDetectorRef>;
    component.chartRef = new ElementRef(document.createElement('canvas'));

    spyOn(component, 'loadUsers').and.callFake(() => {
      component.users = mockUsers;
      component.selectedUser = mockUsers[0];
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize users on ngOnInit', () => {
    component.ngOnInit();
    expect(component.loadUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(1);
    expect(component.users[0].name).toBe('John Doe');
  });

  it('should initialize chart on ngAfterViewInit', () => {
    component.ngOnInit(); 
    component.ngAfterViewInit(); 
    expect(component.selectedUser).toBe(mockUsers[0]);
  });
});
