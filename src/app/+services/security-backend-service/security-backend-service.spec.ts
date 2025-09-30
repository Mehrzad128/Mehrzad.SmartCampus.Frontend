import { TestBed } from '@angular/core/testing';

import { SecurityBackendService } from './security-backend-service';

describe('SecurityBackendService', () => {
  let service: SecurityBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
