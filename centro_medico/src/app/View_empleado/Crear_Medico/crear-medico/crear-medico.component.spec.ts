import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMedicoComponent } from './crear-medico.component';

describe('CrearMedicoComponent', () => {
  let component: CrearMedicoComponent;
  let fixture: ComponentFixture<CrearMedicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearMedicoComponent]
    });
    fixture = TestBed.createComponent(CrearMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
