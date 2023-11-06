import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenCalComponent } from './gen-cal.component';

describe('GenCalComponent', () => {
  let component: GenCalComponent;
  let fixture: ComponentFixture<GenCalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenCalComponent]
    });
    fixture = TestBed.createComponent(GenCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
