import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHoraComponent } from './ver-hora.component';

describe('VerHoraComponent', () => {
  let component: VerHoraComponent;
  let fixture: ComponentFixture<VerHoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerHoraComponent]
    });
    fixture = TestBed.createComponent(VerHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
