/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientHomeService } from './client-home.service';

describe('ClientHomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientHomeService]
    });
  });

  it('should ...', inject([ClientHomeService], (service: ClientHomeService) => {
    expect(service).toBeTruthy();
  }));
});
