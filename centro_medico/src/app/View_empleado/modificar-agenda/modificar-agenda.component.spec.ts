import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAgendaComponent } from './modificar-agenda.component';

describe('ModificarAgendaComponent', () => {
  let component: ModificarAgendaComponent;
  let fixture: ComponentFixture<ModificarAgendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarAgendaComponent]
    });
    fixture = TestBed.createComponent(ModificarAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
