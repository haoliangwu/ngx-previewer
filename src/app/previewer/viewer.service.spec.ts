import { TestBed, inject } from '@angular/core/testing';

import { ViewerService } from './viewer.service';
import { globalConfig } from './model/config';

describe('ViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: globalConfig,
          useValue: {}
        },
        ViewerService
      ]
    });
  });

  it('should be created', inject([ViewerService], (service: ViewerService) => {
    expect(service).toBeTruthy();
  }));
});
