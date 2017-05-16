/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminPostsService } from './admin-posts.service';

describe('AdminPostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPostsService]
    });
  });

  it('should ...', inject([AdminPostsService], (service: AdminPostsService) => {
    expect(service).toBeTruthy();
  }));
});
