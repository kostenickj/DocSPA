/// <reference types="cypress" />

import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import 'zone.js';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';

import { SettingsService } from '../../projects/swimlane/docspa-core/src/lib/services/settings.service';
import { LocationService } from '../../projects/swimlane/docspa-core/src/lib/services/location.service';

describe('LocationService', () => {
  let service: LocationService;
  before(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      providers: [
        // LocationService,
        Location,
        { provide: Location, useValue: HashLocationStrategy },
        SettingsService
      ]
    });

    const location = TestBed.get(Location);
    const settingsService = TestBed.get(SettingsService);
    service = new LocationService(location, settingsService);
  });

  it('should get defaults', () => {
    expect(service.basePath).to.eq('');
    expect(service.ext).to.eq('.md');
  });
});
