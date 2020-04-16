import { TestBed } from '@angular/core/testing';

import { AcertoService } from './acerto.service';

describe('AcertoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcertoService = TestBed.get(AcertoService);
    expect(service).toBeTruthy();
  });
});
