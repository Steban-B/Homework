import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisorArbol } from './visor-arbol';

describe('VisorArbol', () => {
  let component: VisorArbol;
  let fixture: ComponentFixture<VisorArbol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisorArbol],
    }).compileComponents();

    fixture = TestBed.createComponent(VisorArbol);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
