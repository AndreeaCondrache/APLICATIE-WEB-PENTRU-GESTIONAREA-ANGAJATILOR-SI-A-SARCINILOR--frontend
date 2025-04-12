import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskDetailsEmployeeComponent } from './view-task-details-employee.component';

describe('ViewTaskDetailsComponent', () => {
  let component: ViewTaskDetailsEmployeeComponent;
  let fixture: ComponentFixture<ViewTaskDetailsEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTaskDetailsEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTaskDetailsEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
