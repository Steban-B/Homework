import { TestBed } from '@angular/core/testing';

import { PilaLibros } from './pila-libros';

describe('PilaLibros', () => {
  let service: PilaLibros;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PilaLibros);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
