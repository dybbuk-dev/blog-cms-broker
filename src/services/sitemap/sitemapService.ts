import { IServiceOptions } from '../IServiceOptions';
import fs from 'fs';
import {
  ensureDirectoryExistence,
  getRealPath,
} from '../../utils/pathUtils';
import { getConfig } from '../../config';
import BlogRepository from '../../database/repositories/blogRepository';
import BrokerArticleRepository from '../../database/repositories/brokerArticleRepository';
import BrokerRepository from '../../database/repositories/brokerRepository';
import CategoryRepository from '../../database/repositories/categoryRepository';
import PageRepository from '../../database/repositories/pageRepository';

export default class SitemapService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async refresh() {
    const filepath = getRealPath(getConfig().SITEMAP_PATH);
    const frontendUrl = String(getConfig().FRONTEND_URL);
    ensureDirectoryExistence(filepath);
    const xmlData: string[] = [];

    // #region static pages links
    xmlData.push(`${frontendUrl}/`);
    xmlData.push(`${frontendUrl}/blog`);
    xmlData.push(`${frontendUrl}/broker-vergleich`);
    xmlData.push(
      `${frontendUrl}/forex-cfd-broker-vergleich`,
    );
    // #endregion

    // #region categories links
    const { rows: categories } =
      await CategoryRepository.findAndCountAll(
        { filter: { activated: true } },
        this.options,
      );
    for (const category of categories) {
      xmlData.push(`${frontendUrl}${category.link}`);
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
        `${frontendUrl}${
          page.navigation?.link || page.link
        }`,
      );
      if (page.pdf) {
        xmlData.push(
          `${frontendUrl}${
            page.navigation?.link || page.link
          }.pdf`,
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
        `${frontendUrl}/erfahrungsberichte/${broker.name_normalized}`,
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
          `${frontendUrl}/${article.broker.name_normalized}/${article.name_normalized}`,
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
        `${frontendUrl}/blog/${blog.name_normalized}`,
      );
    }
    // #endregion

    fs.writeFileSync(filepath, xmlData.join('\n'));
    return true;
  }
}
