import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import BrokerRepository from '../database/repositories/brokerRepository';
import NavigationRepository from '../database/repositories/navigationRepository';
import AuthorRepository from '../database/repositories/authorRepository';
import BrokersCategoryRepository from '../database/repositories/brokersCategoryRepository';
import CategoryRepository from '../database/repositories/categoryRepository';
import BrokerMetaRepository from '../database/repositories/brokerMetaRepository';
import BrokerUpsideRepository from '../database/repositories/brokerUpsideRepository';
import BrokerRegulatoryAuthorityRepository from '../database/repositories/brokerRegulatoryAuthorityRepository';
import BrokerDepositGuaranteeRepository from '../database/repositories/brokerDepositGuaranteeRepository';
import BrokerCertificateRepository from '../database/repositories/brokerCertificateRepository';
import BrokerSpreadRepository from '../database/repositories/brokerSpreadRepository';
import BrokerFeatureRepository from '../database/repositories/brokerFeatureRepository';
import BrokerPhoneRepository from '../database/repositories/brokerPhoneRepository';
import BrokerFaxRepository from '../database/repositories/brokerFaxRepository';
import BrokerEmailRepository from '../database/repositories/brokerEmailRepository';
import BrokerAddressRepository from '../database/repositories/brokerAddressRepository';
import BrokerVideoRepository from '../database/repositories/brokerVideoRepository';

export default class BrokerService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async _withRelatedData(data, transaction) {
    const options = { ...this.options, transaction };
    return {
      ...data,
      navigation:
        await NavigationRepository.filterIdInTenant(
          data.navigation,
          options,
        ),
      author: await AuthorRepository.filterIdInTenant(
        data.author,
        options,
      ),
    };
  }

  /**
   * ! Update Broker Meta
   */
  async _updateBrokerMeta(id, data, transaction) {
    const options = { ...this.options, transaction };
    const metaId =
      await BrokerMetaRepository.filterIdInTenant(
        id,
        options,
      );
    if (metaId) {
      await BrokerMetaRepository.update(id, data, options);
    } else {
      await BrokerMetaRepository.create(
        {
          ...data,
          id: id,
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker's Categories
   */
  async _updateBrokersCategories(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokersCategoryRepository.destroyByBroker(
      id,
      options,
    );
    const categories_in_top_lists =
      data.categories_in_top_lists || [];
    const items = data.categories || [];
    for (const category of items) {
      await BrokersCategoryRepository.create(
        {
          broker: id,
          category:
            await CategoryRepository.filterIdInTenant(
              category,
              options,
            ),
          show_in_top_listings:
            categories_in_top_lists.includes(category),
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Upside
   */
  async _updateBrokerUpside(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerUpsideRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.upsides || [];
    for (const item of items) {
      await BrokerUpsideRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Regulatory Authority
   */
  async _updateBrokerRegulatoryAuthority(
    id,
    data,
    transaction,
  ) {
    const options = { ...this.options, transaction };
    await BrokerRegulatoryAuthorityRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.regulatory_authorities || [];
    for (const item of items) {
      await BrokerRegulatoryAuthorityRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Deposit Guarantee
   */
  async _updateBrokerDepositGuarantee(
    id,
    data,
    transaction,
  ) {
    const options = { ...this.options, transaction };
    await BrokerDepositGuaranteeRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.deposit_guarantees || [];
    for (const item of items) {
      await BrokerDepositGuaranteeRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Certificate
   */
  async _updateBrokerCertificate(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerCertificateRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.certificates || [];
    for (const item of items) {
      await BrokerCertificateRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Spread
   */
  async _updateBrokerSpread(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerSpreadRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.spreads || [];
    for (const item of items) {
      await BrokerSpreadRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Feature
   */
  async _updateBrokerFeature(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerFeatureRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.features || [];
    for (const item of items) {
      await BrokerFeatureRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Phone
   */
  async _updateBrokerPhone(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerPhoneRepository.destroyByBroker(
      id,
      options,
    );
    const items = [data.phone].filter(Boolean);
    for (const item of items) {
      await BrokerPhoneRepository.create(
        {
          phone: item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Fax
   */
  async _updateBrokerFax(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerFaxRepository.destroyByBroker(id, options);
    const items = [data.fax].filter(Boolean);
    for (const item of items) {
      await BrokerFaxRepository.create(
        {
          fax: item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Email
   */
  async _updateBrokerEmail(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerEmailRepository.destroyByBroker(
      id,
      options,
    );
    const items = [data.email].filter(Boolean);
    for (const item of items) {
      await BrokerEmailRepository.create(
        {
          email: item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Address
   */
  async _updateBrokerAddress(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerAddressRepository.destroyByBroker(
      id,
      options,
    );
    const prefix = 'address_';
    const address = {};
    BrokerAddressRepository.ALL_FIELDS.forEach((field) => {
      const realField = `${prefix}${field}`;
      console.log(realField, data[realField]);
      if (data[realField]) {
        address[field] = data[realField];
      }
    });
    const items = [address].filter(Boolean);
    for (const item of items) {
      await BrokerAddressRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Video
   */
  async _updateBrokerVideo(id, data, transaction) {
    const options = { ...this.options, transaction };
    const metaId =
      await BrokerVideoRepository.filterIdInTenant(
        id,
        options,
      );
    if (metaId) {
      await BrokerVideoRepository.update(id, data, options);
    } else {
      await BrokerVideoRepository.create(
        {
          ...data,
          id: id,
        },
        options,
      );
    }
  }

  /**
   * * Update Related Broker's Data
   */
  async _updateRelatedData(id, data, transaction) {
    await this._updateBrokerMeta(id, data, transaction);
    await this._updateBrokersCategories(
      id,
      data,
      transaction,
    );
    await this._updateBrokerUpside(id, data, transaction);
    await this._updateBrokerRegulatoryAuthority(
      id,
      data,
      transaction,
    );
    await this._updateBrokerDepositGuarantee(
      id,
      data,
      transaction,
    );
    await this._updateBrokerCertificate(
      id,
      data,
      transaction,
    );
    await this._updateBrokerSpread(id, data, transaction);
    await this._updateBrokerFeature(id, data, transaction);
    await this._updateBrokerPhone(id, data, transaction);
    await this._updateBrokerFax(id, data, transaction);
    await this._updateBrokerEmail(id, data, transaction);
    await this._updateBrokerAddress(id, data, transaction);
    await this._updateBrokerVideo(id, data, transaction);
  }

  async create(data) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      const record = await BrokerRepository.create(
        await this._withRelatedData(data, transaction),
        {
          ...this.options,
          transaction,
        },
      );

      await this._updateRelatedData(
        record.id,
        data,
        transaction,
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'broker',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      const record = await BrokerRepository.update(
        id,
        await this._withRelatedData(data, transaction),
        {
          ...this.options,
          transaction,
        },
      );

      await this._updateRelatedData(
        record.id,
        data,
        transaction,
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'broker',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      for (const id of ids) {
        await BrokerRepository.destroy(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async findById(id) {
    return BrokerRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return BrokerRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return BrokerRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await BrokerRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
