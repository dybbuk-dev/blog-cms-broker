import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_metas = sequelize.define(
    'broker_metas',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: false,
        primaryKey: true,
      },
      homepage: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      homepage_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      homepage_impression: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      broker_type: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      teaser: { type: DataTypes.TEXT, allowNull: false },
      demo_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      account_url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      maximum_leverage: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      minimum_deposit: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      minimum_deposit_short: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [0, 50],
        },
      },
      custodian_fees: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      mobile_trading: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      phone_order: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      licensed_broker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      withholding_tax: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
      },
      scalping_allowed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ip: {
        type: DataTypes.CHAR(39),
        allowNull: false,
        validate: {
          len: [0, 39],
        },
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      modified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      indexes: [],
      underscored: true,
      timestamps: false,
    },
  );

  broker_metas.associate = (models) => {
    models.broker_metas.belongsTo(models.broker, {
      constraints: true,
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_metas;
}
