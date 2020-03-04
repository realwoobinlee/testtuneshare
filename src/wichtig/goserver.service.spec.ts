import { TestBed } from '@angular/core/testing';

import { GoserverService } from './goserver.service';

describe('GoserverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoserverService = TestBed.get(GoserverService);
    expect(service).toBeTruthy();
  });
});
