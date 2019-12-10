import { TestBed } from '@angular/core/testing';

import { FormapagamentoService } from './formapagamento.service';

describe('FormapagamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormapagamentoService = TestBed.get(FormapagamentoService);
    expect(service).toBeTruthy();
  });
});
