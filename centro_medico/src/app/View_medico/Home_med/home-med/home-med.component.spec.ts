import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMedComponent } from './home-med.component';

describe('HomeMedComponent', () => {
  let component: HomeMedComponent;
  let fixture: ComponentFixture<HomeMedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMedComponent]
    });
    fixture = TestBed.createComponent(HomeMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
