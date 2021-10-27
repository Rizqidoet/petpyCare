import { TestBed } from '@angular/core/testing';

import { StorageCapService } from './storage-cap.service';

describe('StorageCapService', () => {
  let service: StorageCapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageCapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
