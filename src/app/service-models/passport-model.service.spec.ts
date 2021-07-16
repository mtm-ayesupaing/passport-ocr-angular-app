import { TestBed } from '@angular/core/testing';

import { PassportModelService } from './passport-model.service';

describe('PassportModelService', () => {
  let service: PassportModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassportModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
