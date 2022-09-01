const brokerEnumerators = {
  upside: {
    type: ['UPSIDE', 'DOWNSIDE'],
  },
  meta: {
    broker_type: [
      'DMA',
      'ECN',
      'ECN_AND_MT4',
      'MM',
      'MM_AND_MT4',
      'MARKET_MAKER_AND_STP',
      'MT4',
      'STP',
      'STP_AND_MT4',
      'BITCOIN_EXCHANGE',
    ],
  },
};

export default brokerEnumerators;
