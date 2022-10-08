import { IServiceOptions } from '../IServiceOptions';

export default class SitemapService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async refresh() {
    console.log('sitemap refresh');
    return true;
  }
}
