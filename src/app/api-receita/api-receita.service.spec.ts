import { TestBed } from '@angular/core/testing';

import { ApiReceitaService } from './api-receita.service';

describe('ApiReceitaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiReceitaService = TestBed.get(ApiReceitaService);
    expect(service).toBeTruthy();
  });
});
