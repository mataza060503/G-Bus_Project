/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalDataService } from './LocalData.service';

describe('Service: LocalData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalDataService]
    });
  });

  it('should ...', inject([LocalDataService], (service: LocalDataService) => {
    expect(service).toBeTruthy();
  }));
});
