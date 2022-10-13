import { i18n } from '../../i18n';
import { Typography } from '@mui/material';
import Layout from '../Layout';
import React from 'react';

function BrokerComparePage(props) {
  return (
    <Layout
      title={i18n('entities.broker.comparison.title')}
      keywords={['forex', 'cfd', 'broker', 'vergleich']}
      description="Vergleichen Sie Forex- und CFD-Broker miteinander und finden Sie so den besten Broker für Ihre Bedürfnisse."
      url={props.url}
    >
      <>
        <Typography variant="h1">
          {i18n('entities.broker.comparison.title')}
        </Typography>
        <Typography
          color="text"
          fontWeight="regular"
          variant="body2"
        >
          {i18n('entities.broker.comparison.description')}
        </Typography>
      </>
    </Layout>
  );
}

export default BrokerComparePage;
