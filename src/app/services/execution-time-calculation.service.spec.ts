import { TestBed } from '@angular/core/testing';

import { ExecutionTimeCalculationService } from './execution-time-calculation.service';

describe('ExecutionTimeCalculationService', () => {
  let service: ExecutionTimeCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutionTimeCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
