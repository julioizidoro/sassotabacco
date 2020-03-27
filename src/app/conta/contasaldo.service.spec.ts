import { TestBed } from '@angular/core/testing';

import { ContasaldoService } from './contasaldo.service';

describe('ContasaldoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContasaldoService = TestBed.get(ContasaldoService);
    expect(service).toBeTruthy();
  });
});
