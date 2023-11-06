import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenConsComponent } from './gen-cons.component';

describe('GenConsComponent', () => {
  let component: GenConsComponent;
  let fixture: ComponentFixture<GenConsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenConsComponent]
    });
    fixture = TestBed.createComponent(GenConsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
