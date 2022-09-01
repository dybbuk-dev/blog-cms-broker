import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_checkbox = sequelize.define(
    'broker_checkbox',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: false,
        primaryKey: true,
      },
      trade_platform: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_trade_platform: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      free_demo_account: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_free_demo_account: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metatrader_4: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_metatrader_4: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metatrader_5: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_metatrader_5: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      web_platform: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_web_platform: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mobile_trading_apps: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_mobile_trading_apps: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hedging_allowed: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_hedging_allowed: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      additional_trade_tools: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_additional_trade_tools: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      automated_trade_possible: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_automated_trade_possible: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      api_interfaces: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_api_interfaces: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      social_trading: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_social_trading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rate_alarms: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_rate_alarms: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      platform_tutorials: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_platform_tutorials: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      layout_saveable: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_layout_saveable: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      one_click_trading: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_one_click_trading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      trade_from_chart: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_trade_from_chart: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      all_positions_closeable: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_all_positions_closeable: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      guaranteed_stops: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_guaranteed_stops: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phone_trade_possible: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_phone_trade_possible: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      commissions: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_commissions: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      important_market_spreads: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_important_market_spreads: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cost_for_overnight: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_cost_for_overnight: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fees_for_deposit_disbursal: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_fees_for_deposit_disbursal: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      free_orderchange: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_free_orderchange: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      free_depot: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_free_depot: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      no_platform_fees: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_no_platform_fees: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      german_support: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_german_support: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      contact: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_contact: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      daily_trade_help: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_daily_trade_help: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      german_webinar: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_german_webinar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      german_seminar: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_german_seminar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      coachings_available: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_coachings_available: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      knowledge_base: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_knowledge_base: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tradeable_markets: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_tradeable_markets: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      margin: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_margin: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      managed_accounts: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_managed_accounts: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      instant_execution: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_instant_execution: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      positive_slippage_possible: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_positive_slippage_possible: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ecn_order_execution: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_ecn_order_execution: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      liquidity_prodiver: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_liquidity_prodiver: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      micro_lots: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_micro_lots: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      index_cfd_tradeable_below_point: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_index_cfd_tradeable_below_point: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rate_switch_24_5_index_cfd: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_rate_switch_24_5_index_cfd: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      no_financial_cost_index_cfd: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_no_financial_cost_index_cfd: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      no_financial_cost_raw_material_cfd: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_no_financial_cost_raw_material_cfd: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cfd_contracts_automatic_roll: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_cfd_contracts_automatic_roll: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      real_stocks_cfd_spreads: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_real_stocks_cfd_spreads: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      dma_stocks: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_dma_stocks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      minimal_ordersize_stocks: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_minimal_ordersize_stocks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      company: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_company: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      office_in_germany: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_office_in_germany: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bonus: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_bonus: { type: DataTypes.TEXT, allowNull: true },
      regulation_and_deposit_security: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_regulation_and_deposit_security: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reserve_liabiliry: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_reserve_liabiliry: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      interest_on_deposit: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_interest_on_deposit: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      witholding_tax: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_witholding_tax: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      segregated_accounts: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_segregated_accounts: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      account_currencies: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_account_currencies: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      posibilities_for_withdrawals: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      text_posibilities_for_withdrawals: {
        type: DataTypes.TEXT,
        allowNull: true,
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

  broker_checkbox.associate = (models) => {
    models.broker_checkbox.belongsTo(models.broker, {
      constraints: true,
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_checkbox;
}
