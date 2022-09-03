import { IRepositoryOptions } from './IRepositoryOptions';
import { orderByUtils } from '../utils/orderByUtils';
import AuditLogRepository from './auditLogRepository';
import BrokerAddressRepository from './brokerAddressRepository';
import BrokerBankRepository from './brokerBankRepository';
import BrokerCertificateRepository from './brokerCertificateRepository';
import BrokerCheckboxRepository from './brokerCheckboxRepository';
import BrokerCreteriaRepository from './brokerCreteriaRepository';
import BrokerCurrencyPairRepository from './brokerCurrencyPairRepository';
import BrokerDepositGuaranteeRepository from './brokerDepositGuaranteeRepository';
import BrokerEmailRepository from './brokerEmailRepository';
import BrokerFaxRepository from './brokerFaxRepository';
import BrokerFeatureRepository from './brokerFeatureRepository';
import BrokerMetaRepository from './brokerMetaRepository';
import BrokerMinimumTradingUnitRepository from './brokerMinimumTradingUnitRepository';
import BrokerOrderTypeRepository from './brokerOrderTypeRepository';
import BrokerPhoneRepository from './brokerPhoneRepository';
import BrokerRegulatoryAuthorityRepository from './brokerRegulatoryAuthorityRepository';
import BrokersCategoryRepository from './brokersCategoryRepository';
import BrokerSpreadRepository from './brokerSpreadRepository';
import BrokerTradePlatformRepository from './brokerTradePlatformRepository';
import BrokerUpsideRepository from './brokerUpsideRepository';
import BrokerVideoRepository from './brokerVideoRepository';
import Error404 from '../../errors/Error404';
import lodash from 'lodash';
import moment from 'moment';
import Sequelize from 'sequelize';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import SequelizeRepository from './sequelizeRepository';

const Op = Sequelize.Op;

class BrokerRepository {
  static ALL_FIELDS = [
    'name',
    'name_normalized',
    'activated',
    'is_broker',
    'is_compareable',
    'top_broker',
    'top_binary_broker',
    'top_forex_broker',
    'featured_broker',
    'pdf',
    'author_name',
    'author_link',
  ];

  static _relatedData(data) {
    return {
      navigation_id: data.navigation || null,
      author_id: data.author || null,
    };
  }

  static includes(
    options: IRepositoryOptions,
    metaOnly = false,
  ) {
    return [
      {
        model: options.database.broker_metas,
        as: 'meta',
      },
      !metaOnly && {
        model: options.database.navigation,
        as: 'navigation',
      },
      !metaOnly && {
        model: options.database.author,
        as: 'author',
      },
      !metaOnly && {
        model: options.database.broker_phone,
        as: 'phone',
      },
      !metaOnly && {
        model: options.database.broker_fax,
        as: 'fax',
      },
      !metaOnly && {
        model: options.database.broker_email,
        as: 'email',
      },
      !metaOnly && {
        model: options.database.broker_address,
        as: 'address',
      },
      !metaOnly && {
        model: options.database.broker_video,
        as: 'video',
      },
      !metaOnly && {
        model: options.database.broker_checkbox,
        as: 'checkbox',
      },
      !metaOnly && {
        model: options.database.broker_creterias,
        as: 'creteria',
      },
    ].filter(Boolean);
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record = await options.database.broker.create(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data),
        ip: data.ip ?? '',
        created: moment(),
        modified: moment(),
      },
      {
        transaction,
      },
    );

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

    let record = await options.database.broker.findOne({
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
        ip: data.ip ?? '',
        modified: moment(),
      },
      {
        transaction,
      },
    );

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

    let record = await options.database.broker.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!record) {
      throw new Error404();
    }

    const Repositories: any[] = [
      BrokerAddressRepository,
      BrokerBankRepository,
      BrokerCertificateRepository,
      BrokerCheckboxRepository,
      BrokerCreteriaRepository,
      BrokerCurrencyPairRepository,
      BrokerDepositGuaranteeRepository,
      BrokerEmailRepository,
      BrokerFaxRepository,
      BrokerFeatureRepository,
      BrokerMetaRepository,
      BrokerMinimumTradingUnitRepository,
      BrokerOrderTypeRepository,
      BrokerPhoneRepository,
      BrokerRegulatoryAuthorityRepository,
      BrokersCategoryRepository,
      BrokerSpreadRepository,
      BrokerTradePlatformRepository,
      BrokerUpsideRepository,
      BrokerVideoRepository,
    ];
    for (const Repository of Repositories) {
      if (
        typeof Repository.destroyByBroker === 'function'
      ) {
        await Repository.destroyByBroker(id, options);
      }
    }

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

    const include = this.includes(options);

    const record = await options.database.broker.findOne({
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

    const records = await options.database.broker.findAll({
      attributes: ['id'],
      where,
    });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.broker.count({
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
    let include = this.includes(options, true);

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

      if (filter.parent) {
        whereAnd.push({
          ['parent_id']: filter.parent,
        });
      }

      ['name', 'name_normalized'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'broker',
              field,
              filter[field],
            ),
          );
        }
      });

      [
        'activated',
        'is_broker',
        'is_compareable',
        'top_broker',
        'top_binary_broker',
        'top_forex_broker',
        'featured_broker',
        'pdf',
      ].forEach((field) => {
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
      await options.database.broker.findAndCountAll({
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [orderByUtils(orderBy)]
          : [['id', 'DESC']],
        transaction:
          SequelizeRepository.getTransaction(options),
      });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
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
              'broker',
              'name',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.broker.findAll({
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
        entityName: 'broker',
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
    metaOnly = true,
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

    const transaction =
      SequelizeRepository.getTransaction(options);

    const brokerParam = {
      filter: {
        broker_id: output.id,
      },
    };

    const { rows: categories } =
      await BrokersCategoryRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.categories = categories;

    if (metaOnly) {
      return output;
    }

    const { rows: upsides } =
      await BrokerUpsideRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.upsides = upsides || null;

    const { rows: regulatory_authorities } =
      await BrokerRegulatoryAuthorityRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.regulatory_authorities =
      regulatory_authorities || null;

    const { rows: deposit_guarantees } =
      await BrokerDepositGuaranteeRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.deposit_guarantees = deposit_guarantees || null;

    const { rows: certificates } =
      await BrokerCertificateRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.certificates = certificates || null;

    const { rows: spreads } =
      await BrokerSpreadRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.spreads = spreads || null;

    const { rows: features } =
      await BrokerFeatureRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.features = features || null;

    const { rows: banks } =
      await BrokerBankRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.banks = banks || null;

    const { rows: order_types } =
      await BrokerOrderTypeRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.order_types =
      order_types?.map((val) => val.type) || null;

    const { rows: minimum_trading_units } =
      await BrokerMinimumTradingUnitRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.minimum_trading_units =
      minimum_trading_units?.map(
        (val) => val.minimum_trading_unit,
      ) || null;

    const { rows: currency_pairs } =
      await BrokerCurrencyPairRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.currency_pairs = currency_pairs || null;

    const { rows: trade_platforms } =
      await BrokerTradePlatformRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.trade_platforms = trade_platforms || null;

    return output;
  }
}

export default BrokerRepository;
