import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const brokers_category = sequelize.define(
    'brokers_category',
    {
      broker_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      show_in_top_listings: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      indexes: [],
      underscored: true,
      timestamps: false,
      paranoid: true,
    },
  );

  brokers_category.associate = (models) => {
    models.brokers_category.belongsTo(models.broker, {
      constraints: true,
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.brokers_category.belongsTo(models.category, {
      constraints: true,
      foreignKey: 'category_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return brokers_category;
}
