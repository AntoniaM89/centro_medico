import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEspecialidadComponent } from './crear-especialidad.component';

describe('CrearEspecialidadComponent', () => {
  let component: CrearEspecialidadComponent;
  let fixture: ComponentFixture<CrearEspecialidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEspecialidadComponent]
    });
    fixture = TestBed.createComponent(CrearEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
