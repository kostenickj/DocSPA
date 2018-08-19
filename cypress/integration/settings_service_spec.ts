/// <reference types="cypress" />

import { TestBed, inject } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import 'zone.js';

import { SettingsService } from '../../projects/swimlane/docspa-core/src/lib/services/settings.service';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
      platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      providers: [SettingsService]
    });
  });

  it('should get defaults', inject([SettingsService], (service: SettingsService) => {
    expect(service.basePath).to.eq('');
    expect(service.coverpage).to.eq('');
    expect(service.ext).to.eq('.md');
  }));
});
