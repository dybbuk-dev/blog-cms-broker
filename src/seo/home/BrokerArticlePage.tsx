import { Box, Typography } from '@mui/material';
import { i18n } from '../i18n';
import AuthorView from './shared/AuthorView';
import Breadcrumb from './Breadcrumb';
import HtmlView from './shared/HtmlView';
import React from 'react';
import TopBrokersView from './broker/components/TopBrokersView';

function BrokerArticlePage({ brokerArticle, ...props }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        '& > * + *': {
          mt: 2,
        },
      }}
    >
      <Breadcrumb
        items={[
          {
            name: brokerArticle.broker.name,
            route: `/erfahrungsberichte/${brokerArticle.broker.name_normalized}`,
          },
          {
            name: brokerArticle.name,
            route: `/${brokerArticle.broker.name_normalized}/${brokerArticle.name_normalized}`,
          },
        ]}
        {...props}
      />
      <HtmlView value={brokerArticle.content} />
      <AuthorView value={brokerArticle.author} />
      <Typography display="block" variant="h3" mb={2}>
        {i18n('entities.home.top_brokers')}
      </Typography>
      <TopBrokersView rows={props.topBrokers} />
    </Box>
  );
}

export default BrokerArticlePage;
