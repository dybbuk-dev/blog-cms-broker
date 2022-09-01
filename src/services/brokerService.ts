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
    for (const category of data.categories || []) {
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
    const upsides = data.upsides || [];
    for (const upside of upsides) {
      await BrokerUpsideRepository.create(
        {
          ...upside,
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
    const regulatoryAuthorities =
      data.regulatory_authorities || [];
    for (const regulatoryAuthority of regulatoryAuthorities) {
      await BrokerRegulatoryAuthorityRepository.create(
        {
          ...regulatoryAuthority,
          broker: id,
          ip: data.ip || '',
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
