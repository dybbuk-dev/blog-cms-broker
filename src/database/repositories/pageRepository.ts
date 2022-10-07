import lodash from 'lodash';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import SequelizeRepository from './sequelizeRepository';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import moment from 'moment';
import { orderByUtils } from '../utils/orderByUtils';
import FileRepository from './fileRepository';
import PageRelatedLinkRepository from './pageRelatedLinkRepository';
import NavigationRepositoryEx from './extends/navigationRepositoryEx';
import AuthorRepository from './authorRepository';
import { getConfig } from '../../config';
import {
  ensureDirectoryExistence,
  getRealPath,
} from '../../utils/pathUtils';
import path from 'path';
import LocalFileStorage from '../../services/file/localhostFileStorage';
import slug from 'slug';
import { sleep } from '../../utils/dateTimeUtils';

const Op = Sequelize.Op;

class PageRepository {
  static ALL_FIELDS = [
    'link',
    'title',
    'meta_keywords',
    'meta_description',
    'created',
    'teaser_link',
    'teaser_title',
    'teaser',
    'name',
    'body',
    'activated',
    'pdf',
  ];

  static _relatedData(data) {
    return {
      parent_id: data.parent ?? null,
      teaser: data.teaser ?? '',
      navigation_id: data.navigation
        ? data.navigation.id
        : null,
      author_id: data.author ? data.author.id : null,
      page_warning_id: data.page_warning
        ? data.page_warning.id
        : null,
      target: data.target ?? '',
      sort: data.sort ?? 0,
      ip: '',
      created: data.created || moment.now(),
      modified: moment.now(),
    };
  }

  static async _replaceRelationFiles(
    record,
    data,
    options: IRepositoryOptions,
  ) {
    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.page.getTableName(),
        belongsToColumn: 'page_image',
        belongsToId: record.id,
      },
      data.page_image.map((v) => ({
        ...v,
        link: data.teaser_link || null,
        linkTitle: data.teaser_title || null,
        new: true,
      })),
      options,
    );
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);
    const record = await options.database.page.create(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data),
      },
      {
        transaction,
      },
    );

    if (data.page_image) {
      await this._replaceRelationFiles(
        record,
        data,
        options,
      );
    }
    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    let record = await options.database.page.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!record) {
      throw new Error404();
    }
    record = await record.update(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data),
      },
      {
        transaction,
      },
    );

    await this._replaceRelationFiles(record, data, options);

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    let record = await options.database.page.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!record) {
      throw new Error404();
    }

    await PageRelatedLinkRepository.destroyByPage(
      id,
      options,
    );

    await FileRepository.destroy(
      {
        belongsTo: options.database.page.getTableName(),
        belongsToId: id,
      },
      options,
    );

    await record.destroy({
      transaction,
    });

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      record,
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const include = [
      {
        model: options.database.author,
        as: 'author',
      },
      {
        model: options.database.navigation,
        as: 'navigation',
      },
      {
        model: options.database.page_warning,
        as: 'page_warning',
      },
    ];

    const record = await options.database.page.findOne({
      where: {
        id,
      },
      include,
      transaction,
    });

    if (!record) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(
      record,
      options,
      false,
    );
  }

  static async findByURL(url, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const pdf = /.pdf$/.test(url);
    url = url.replace(/.pdf$/, '');

    const navigation =
      await NavigationRepositoryEx.findByURL(url, options);

    const include = [
      {
        model: options.database.author,
        as: 'author',
        include: {
          model: options.database.file,
          as: 'author_image',
          separate: true,
        },
      },
      {
        model: options.database.navigation,
        as: 'navigation',
      },
      {
        model: options.database.page_warning,
        as: 'page_warning',
      },
    ];

    let record =
      navigation &&
      (await options.database.page.findOne({
        where: {
          navigation_id: navigation.id,
          activated: true,
        },
        include,
        transaction,
      }));

    if (!record) {
      record = await options.database.page.findOne({
        where: {
          link: url,
          activated: true,
        },
        include,
        transaction,
      });
      if (!record) {
        return null;
      }
    }

    if (pdf && record.pdf) {
      const privatePdf = `pages/${record.id}/${slug(
        record.name,
      )}.pdf`;
      const localStoragePath = getRealPath(
        getConfig().FILE_STORAGE_PATH,
      );
      const pdfPathname = path.join(
        localStoragePath,
        privatePdf,
      );
      ensureDirectoryExistence(pdfPathname);
      try {
        const fs = require('fs');
        const conversion = require('phantom-html-to-pdf')();
        let processing = true;
        conversion(
          {
            html: [
              '<!DOCTYPE html>',
              '<html>',
              '<head>',
              '<meta charset="utf-8" />',
              '<style>',
              'body { font-family: "Roboto", "Helvetica", "Arial", sans-serif; }',
              '</style>',
              '</head>',
              '<body>',
              record.body.replace(
                / src=\"\/files\//gi,
                ` src="${getConfig().FRONTEND_URL}/files/`,
              ),
              '</body>',
              '</html>',
            ].join(''),
          },
          function (err, pdf) {
            if (err) {
              console.log(err);
              throw err;
            }
            var output = fs.createWriteStream(pdfPathname);
            pdf.stream.pipe(output);
            processing = false;
          },
        );

        while (processing) {
          await sleep(1000);
          console.log('waiting...');
        }

        console.log(privatePdf);
        return {
          downloadPdf: true,
          downloadUrl: await LocalFileStorage.downloadUrl(
            privatePdf,
          ),
        };
      } catch (error) {
        console.log(error);
        console.log(pdfPathname);
        throw error;
      }
    }

    return this._fillWithRelationsAndFiles(
      record,
      options,
      false,
    );
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const where = {
      id: {
        [Op.in]: ids,
      },
    };

    const records = await options.database.page.findAll({
      attributes: ['id'],
      where,
    });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.page.count({
      where: {
        ...filter,
      },
      transaction,
    });
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];
    const include = [
      {
        model: options.database.navigation,
        as: 'navigation',
      },
      {
        model: options.database.author,
        as: 'author',
      },
      {
        model: options.database.page_warning,
        as: 'page_warning',
      },
    ];
    if (filter) {
      if (filter.idRange) {
        const [start, end] = filter.idRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          whereAnd.push({
            id: {
              [Op.gte]: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          whereAnd.push({
            id: {
              [Op.lte]: end,
            },
          });
        }
      }

      if (filter.type) {
        whereAnd.push({
          [Op.or]: [
            {
              navigation_id: {
                [Op.in]:
                  await NavigationRepositoryEx.filterNavigationIds(
                    filter.type,
                    options,
                  ),
              },
            },
            NavigationRepositoryEx.getTypeIndex(
              filter.type,
            ) === 0 && {
              navigation_id: {
                [Op.is]: null,
              },
            },
          ].filter(Boolean),
        });
      }

      if (filter.author) {
        if (
          filter.author !== undefined &&
          filter.author !== null &&
          filter.author !== ''
        ) {
          whereAnd.push({
            author_id: filter.author.id,
          });
        }
      }

      if (filter.page_warning) {
        if (
          filter.page_warning !== undefined &&
          filter.page_warning !== null &&
          filter.page_warning !== ''
        ) {
          whereAnd.push({
            page_warning_id: filter.page_warning.id,
          });
        }
      }

      [
        'name',
        'link',
        'title',
        'meta_keywords',
        'meta_description',
        'body',
      ].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'page',
              field,
              filter[field],
            ),
          );
        }
      });

      ['activated', 'pdf'].forEach((field) => {
        if (
          filter[field] === true ||
          filter[field] === 'true' ||
          filter[field] === false ||
          filter[field] === 'false'
        ) {
          whereAnd.push({
            [field]:
              filter[field] === true ||
              filter[field] === 'true',
          });
        }
      });
    }

    const where = { [Op.and]: whereAnd };
    let { rows, count } =
      await options.database.page.findAndCountAll({
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [orderByUtils(orderBy, options)]
          : [['id', 'DESC']],
        transaction:
          SequelizeRepository.getTransaction(options),
      });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
      true,
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    query,
    limit,
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: query },
          {
            [Op.and]: SequelizeFilterUtils.ilikeIncludes(
              'page',
              'name',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.page.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      order: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }

  static async _createAuditLog(
    action,
    record,
    data,
    options: IRepositoryOptions,
  ) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'page',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  static async _fillWithRelationsAndFilesForRows(
    rows,
    options: IRepositoryOptions,
    metaOnly,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(
          record,
          options,
          metaOnly,
        ),
      ),
    );
  }

  static async _fillWithRelationsAndFiles(
    record,
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    if (metaOnly) {
      return output;
    }

    output.author =
      await AuthorRepository._fillWithRelationsAndFiles(
        record.author,
        options,
      );

    const pageParam = {
      filter: {
        page_id: output.id,
      },
    };

    const transaction =
      SequelizeRepository.getTransaction(options);

    output.page_image =
      await FileRepository.fillDownloadUrl(
        await record.getPage_image({
          transaction,
        }),
      );

    const { rows: related_links } =
      await PageRelatedLinkRepository.findAndCountAll(
        pageParam,
        options,
      );

    output.related_links = related_links || null;

    return output;
  }
}

export default PageRepository;
