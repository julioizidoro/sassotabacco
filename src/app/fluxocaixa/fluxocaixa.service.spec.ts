import { TestBed } from '@angular/core/testing';

import { FluxocaixaService } from './fluxocaixa.service';

describe('FluxocaixaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FluxocaixaService = TestBed.get(FluxocaixaService);
    expect(service).toBeTruthy();
  });
});
