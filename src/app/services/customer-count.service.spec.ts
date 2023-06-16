import { TestBed } from '@angular/core/testing';

import { CustomerCountService } from './customer-count.service';

describe('CustomerCountService', () => {
  let service: CustomerCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
