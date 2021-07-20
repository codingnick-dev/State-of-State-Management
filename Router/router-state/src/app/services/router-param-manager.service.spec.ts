import { TestBed } from '@angular/core/testing';

import { RouterParamManagerService } from './router-param-manager.service';

describe('RouterParamManagerService', () => {
  let service: RouterParamManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterParamManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
