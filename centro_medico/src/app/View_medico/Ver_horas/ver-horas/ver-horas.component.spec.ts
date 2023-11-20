import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHorasComponent } from './ver-horas.component';

describe('VerHorasComponent', () => {
  let component: VerHorasComponent;
  let fixture: ComponentFixture<VerHorasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerHorasComponent]
    });
    fixture = TestBed.createComponent(VerHorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
