import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_address = sequelize.define(
    'broker_address',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      broker_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      line_0: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      line_1: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      line_2: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      line_3: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      line_4: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      line_5: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
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
      underscored: true,
      timestamps: false,
      paranoid: true,
    },
  );

  broker_address.associate = (models) => {
    models.broker_address.belongsTo(models.broker, {
      constraints: true,
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_address;
}
