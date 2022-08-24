import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const product = sequelize.define(
    'product',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      reference: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {},
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: [1, 200],
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1, 1000],
          notEmpty: true,
        },
      },
      website: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          len: [1, 100],
          notEmpty: true,
        },
      },
      rating: {
        type: DataTypes.DECIMAL,
        validate: {
          max: 5,
        },
      },
      popularity: {
        type: DataTypes.INTEGER,
        validate: {
          max: 100,
        },
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
        {
          unique: true,
          fields: ['reference', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
      paranoid: true,
    },
  );

  product.associate = (models) => {
    models.product.belongsTo(models.productCategory, {
      as: 'category',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.product.hasMany(models.file, {
      as: 'logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.product.getTableName(),
        belongsToColumn: 'logo',
      },
    });

    models.product.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.product.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.product.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return product;
}
