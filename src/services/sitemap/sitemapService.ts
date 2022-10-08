import { IServiceOptions } from '../IServiceOptions';
import fs from 'fs';
import {
  ensureDirectoryExistence,
  getRealPath,
} from '../../utils/pathUtils';
import { getConfig } from '../../config';
import PageRepository from '../../database/repositories/pageRepository';
import moment from 'moment';
import BrokerRepository from '../../database/repositories/brokerRepository';
import CategoryRepository from '../../database/repositories/categoryRepository';
import BrokerArticleRepository from '../../database/repositories/brokerArticleRepository';
import BlogRepository from '../../database/repositories/blogRepository';

class SitemapUrl {
  loc: string = '';
  lastmod: string = '';
  changefreq: string = 'daily';

  constructor(
    url: string,
    modified: string | undefined = undefined,
  ) {
    this.loc = url;
    this.lastmod = moment(modified).toISOString();
  }

  tagValue(tagName, value) {
    return `<${tagName}>${value}</${tagName}>`;
  }

  toString() {
    return this.tagValue(
      'url',
      [
        this.tagValue('loc', this.loc),
        this.tagValue('lastmod', this.lastmod),
        this.tagValue('changefreq', this.changefreq),
      ].join(''),
    );
  }
}

export default class SitemapService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async refresh() {
    const filepath = getRealPath(getConfig().SITEMAP_PATH);
    const frontendUrl = String(getConfig().FRONTEND_URL);
    ensureDirectoryExistence(filepath);
    const xmlData: (SitemapUrl | string)[] = [
      '<?xml version="1.0" encoding="UTF-8" ?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    ];

    // #region static pages links
    xmlData.push(new SitemapUrl(`${frontendUrl}/`));
    xmlData.push(new SitemapUrl(`${frontendUrl}/blog`));
    xmlData.push(
      new SitemapUrl(`${frontendUrl}/broker-vergleich`),
    );
    xmlData.push(
      new SitemapUrl(
        `${frontendUrl}/forex-cfd-broker-vergleich`,
      ),
    );
    // #endregion

    // #region categories links
    const { rows: categories } =
      await CategoryRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const category of categories) {
      xmlData.push(
        new SitemapUrl(
          `${frontendUrl}${category.link}`,
          category.modified,
        ),
      );
    }
    // #endregion

    // #region pages' links
    const { rows: pages } =
      await PageRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const page of pages) {
      xmlData.push(
        new SitemapUrl(
          `${frontendUrl}${
            page.navigation?.link || page.link
          }`,
          page.modified,
        ),
      );
      if (page.pdf) {
        xmlData.push(
          new SitemapUrl(
            `${frontendUrl}${
              page.navigation?.link || page.link
            }.pdf`,
            page.modified,
          ),
        );
      }
    }
    // #endregion

    // #region brokers' links
    const { rows: brokers } =
      await BrokerRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const broker of brokers) {
      xmlData.push(
        new SitemapUrl(
          `${frontendUrl}/erfahrungsberichte/${broker.name_normalized}`,
          broker.modified,
        ),
      );
    }
    // #endregion

    // #region broker articles links
    const { rows: articles } =
      await BrokerArticleRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const article of articles) {
      if (article.broker) {
        xmlData.push(
          new SitemapUrl(
            `${frontendUrl}/${article.broker.name_normalized}/${article.name_normalized}`,
            article.modified,
          ),
        );
      }
    }
    // #endregion

    // #region blogs links
    const { rows: blogs } =
      await BlogRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const blog of blogs) {
      xmlData.push(
        new SitemapUrl(
          `${frontendUrl}/blog/${blog.name_normalized}`,
          blog.modified,
        ),
      );
    }
    // #endregion

    xmlData.push('</urlset>'),
      fs.writeFileSync(filepath, xmlData.join(''));
    return true;
  }
}
