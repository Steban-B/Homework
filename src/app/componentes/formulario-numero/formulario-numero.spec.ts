import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNumero } from './formulario-numero';

describe('FormularioNumero', () => {
  let component: FormularioNumero;
  let fixture: ComponentFixture<FormularioNumero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioNumero],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioNumero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
