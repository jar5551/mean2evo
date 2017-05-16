import { TestBed, inject } from '@angular/core/testing';

import { AuthHttpConfigService } from './auth-http-config.service';

describe('AuthHttpConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHttpConfigService]
    });
  });

  it('should ...', inject([AuthHttpConfigService], (service: AuthHttpConfigService) => {
    expect(service).toBeTruthy();
  }));
});
