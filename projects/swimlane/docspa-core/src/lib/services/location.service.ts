import { Injectable } from '@angular/core';
import VFILE from 'vfile';

import { join } from '../utils';
import { resolve } from 'url';

import { SettingsService } from './settings.service';
import { Inject } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy } from '@angular/common';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  /**
   * Determines if a string is an absolut URL
   */
  static isAbsolutePath(_: string) {
    return new RegExp('(:|(\/{2}))', 'g').test(_);
  }

  get root() {
    return this.settings.root;
  }

  get basePath() {
    return this.settings.basePath;
  }

  get ext() {
    return this.settings.ext;
  }

  constructor(
    private settings: SettingsService
  ) {
  }

  /**
   * Convert a page string to a virtual file
   */
  pageToFile(page: string = ''): VFILE.VFile {
    page = page.replace(/^#/, '');
    if (page === '') {
      page = '/';
    }

    let vfile;
    if (page.endsWith(".md")) {
      vfile = VFILE({ path: page, cwd: this.root });
    }
    else if (page.includes(this.settings.baseHref)) {
      if (page == this.settings.baseHref) {
        const p = page.replace(this.settings.baseHref, '') + "/";
        const wd = this.root + this.settings.baseHref;
        vfile = VFILE({ path: p, cwd: wd });
      } else {
        const p = page.replace(this.settings.baseHref, '');
        const wd = this.root + this.settings.baseHref;
        vfile = VFILE({ path: p, cwd: wd });
      }

    }
    else {
      const p = page;
      const wd = this.root + this.settings.baseHref;
      vfile = VFILE({ path: p, page, cwd: wd });
    }
    /* if (vfile.path[0] === '/' && vfile.path[1] === '_') {
      vfile.path = this.settings.notFoundPage;
    } */

    if (vfile.path.slice(-1) === '/') {
      vfile.path = join(vfile.path, this.settings.homepage);
    }

    if (vfile.basename === '') {
      vfile.basename = this.settings.homepage;
    }
    if (vfile.extname === '') {
      vfile.extname = this.settings.ext;
    }

    vfile.data = {
      docspa: {
        url: join(vfile.cwd, vfile.path)
      }
    };

    return vfile;
  }

  /**
   * Return a resolved url relative to the base path
   */
  prepareLink(href: string, base: string = '', bUseBaseHref = false) {
    if (LocationService.isAbsolutePath(href)) {
      return href;
    } else {
      if (this.settings.baseHref !== '/') {
        const u = resolve(this.settings.baseHref + base, href);
        return u;
      }
      const u = resolve(base, href);
      return u;
    }
  }

  /**
   * Return a resolved url relative to the base path
   */
  prepareSrc(src: string, base: string = '') {
    return LocationService.isAbsolutePath(src) ?
      src :
      join(this.basePath, resolve(base, src));
  }

  /**
   * Removes the base HREF from a url
   */
  stripBaseHref(url: string): string {
    if (!url) {
      return null;
    }
    const basePath = this.basePath;
    return basePath && url.startsWith(basePath) ? url.substring(basePath.length) : url;
  }
}
