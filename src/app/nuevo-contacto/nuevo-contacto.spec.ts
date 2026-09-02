import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoContacto } from './nuevo-contacto';

describe('NuevoContacto', () => {
  let component: NuevoContacto;
  let fixture: ComponentFixture<NuevoContacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoContacto],
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoContacto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
