import { i18n } from '../../i18n';
import AuthorView from '../shared/AuthorView';
import Box from '@mui/material/Box';
import BrokerHeader from './components/BrokerHeader';
import BrokerHomepageUrls from './components/BrokerHomepageUrls';
import BrokerOverviewView from './components/BrokerOverviewView';
import BrokerTabs from './BrokerTabs';
import HtmlView from '../shared/HtmlView';
import Layout from '../Layout';
import moment from 'moment';
import React from 'react';
import TopBrokersView from './components/TopBrokersView';
import Typography from '@mui/material/Typography';

const BrokerViewPage = ({ record, ...props }) => {
  const tabValue = 0;

  let title = '';
  let keywords: any[] = [
    'erfahrungen',
    'bewertungen',
    'test',
  ];
  let description = '';
  let author = null;

  if (record) {
    author = record.author;
    keywords.unshift(record.name);
    const stars: string[] = [];
    for (
      let i = 0;
      i <
      Number(
        (record.rating?.overall_rating ?? 0).toFixed(0),
      );
      i++, stars.push('✪')
    );
    title = `${
      record.name
    } Erfahrungen ${moment().year()} » unabhängiger Test`;
    description = record.is_broker
      ? `${
          record.name
        } Erfahrungen » Fazit von Tradern: ${stars.join(
          '',
        )} aus ${
          record.rating?.overall_reviews ?? 0
        } Bewertungen » Unser Test zu Spreads ✚ Plattform ✚ Orderausführung ✚ Service ➔ Jetzt lesen!`
      : `${
          record.name
        } Erfahrungen & Test » Fazit von Tradern: ${stars.join(
          '',
        )} aus ${
          record.rating?.overall_reviews ?? 0
        } Bewertungen ➔ Jetzt lesen!`;
  }

  return (
    <Layout
      title={title}
      keywords={keywords}
      description={description}
      author={author}
    >
      {record && (
        <Box display="flex" flexDirection="column" gap={2}>
          <>
            <BrokerHeader record={record} />
            <Box py={2}>
              <BrokerTabs
                labels={[
                  'overview',
                  {
                    raw: true,
                    label: `${record.name} Erfahrungen`,
                  },
                  'characteristics',
                  'platform',
                  'markets',
                  'spreads',
                  'service',
                ]}
                value={tabValue}
              />
            </Box>
            <Box py={2}>
              <BrokerOverviewView record={record} />
            </Box>
            <BrokerHomepageUrls record={record} />
          </>
          {Boolean(record.creteria) &&
            Boolean(record.creteria.body) && (
              <>
                <Box fontSize="1rem">
                  <HtmlView value={record.creteria?.body} />
                </Box>
              </>
            )}
          <AuthorView value={record.author} />
          <>
            <Typography variant="h4" mb={2}>
              {i18n('entities.home.top_brokers')}
            </Typography>
            <TopBrokersView rows={props.topBrokers} />
          </>
        </Box>
      )}
    </Layout>
  );
};

export default BrokerViewPage;
