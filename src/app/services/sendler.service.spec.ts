import { TestBed } from '@angular/core/testing';

import { SendlerService } from './sendler.service';

describe('SendlerService', () => {
  let service: SendlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
