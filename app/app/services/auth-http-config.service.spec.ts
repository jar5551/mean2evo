/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthHttpConfigService } from './auth-http-config.service';

describe('AuthHttpConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthHttpService]
    });
  });

  it('should ...', inject([AuthHttpService], (service: AuthHttpService) => {
    expect(service).toBeTruthy();
  }));
});
