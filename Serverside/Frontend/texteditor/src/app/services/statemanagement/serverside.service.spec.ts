import { TestBed } from '@angular/core/testing';

import { ServersideService } from './serverside.service';

describe('StatemanagementService', () => {
  let service: ServersideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServersideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
