import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaMedComponent } from './cita-med.component';

describe('CitaMedComponent', () => {
  let component: CitaMedComponent;
  let fixture: ComponentFixture<CitaMedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitaMedComponent]
    });
    fixture = TestBed.createComponent(CitaMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
