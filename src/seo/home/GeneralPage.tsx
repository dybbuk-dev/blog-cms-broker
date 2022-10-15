import { i18n } from '../i18n';
import AuthorView from './shared/AuthorView';
import Box from '@mui/material/Box';
import HtmlView from './shared/HtmlView';
import Layout from './Layout';
import MaterialLink from '@mui/material/Link';
import moment from 'moment';
import React from 'react';
import TopBrokersView from './broker/components/TopBrokersView';
import Typography from '@mui/material/Typography';
import Breadcrumb from './Breadcrumb';

const GeneralPage = ({
  category,
  page,
  brokerArticle,
  ...props
}) => {
  let title = '';
  let keywords: any[] = [];
  let description = '';
  let author = null;

  if (category) {
    title = `${
      category.title
    } Vergleich ${moment().year()} » 100% unabhängiger Test`;
    keywords = [category.name, 'Vergleich', 'Test'];
    description = `100% unabhängiger ${
      category.title
    } Vergleich ✚✚ Über ${category.count ?? 0} ${
      category.title
    } im Test mit Erfahrungsberichten von Tradern ➔ Jetzt lesen!`;
    author = category.author;
  }

  if (page) {
    title = page.title;
    keywords = [page.meta_keywords];
    description = page.meta_description;
    author = page.author;
  }

  if (brokerArticle) {
    title = brokerArticle.pagetitle;
    keywords = [brokerArticle.metakeywords];
    description = brokerArticle.metadescription;
    author = brokerArticle.author;
  }

  return (
    <Layout
      title={title}
      keywords={keywords}
      description={description}
      author={author}
      url={props.url}
    >
      {category && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Breadcrumb
            items={[
              {
                name: category.name,
                route: category.link,
              },
            ]}
            {...props}
          />
          <Typography variant="h2">
            {category.title}
          </Typography>
          {category.teaser && (
            <HtmlView value={category.teaser} />
          )}
          <Typography variant="h3" my={2}>
            {i18n('entities.home.top_brokers')}
          </Typography>
          <TopBrokersView rows={props.topBrokers} />
          {category.description && (
            <HtmlView value={category.description} />
          )}
          <AuthorView value={category.author} />
        </Box>
      )}
      {!category && page && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Breadcrumb {...props} />
          <HtmlView value={page.body} />
          {Boolean(page.related_links.length) && (
            <Box py={2} my={2}>
              <Typography variant="h3">
                {page.navigation.type === 'FOREX_STRATEGY'
                  ? 'Weitere Forex Strategien'
                  : page.navigation.type === 'DOWNLOADS'
                  ? 'Weitere MetaTrader Indikatoren'
                  : 'Weiterführende Links'}
              </Typography>
              {page.related_links.map(
                ({ name, url }, idx) => (
                  <Typography
                    key={idx}
                    variant="body2"
                    fontWeight="regular"
                  >
                    <MaterialLink href={url}>
                      {name}
                    </MaterialLink>
                  </Typography>
                ),
              )}
            </Box>
          )}
          {Boolean(page.page_warning) && (
            <>
              <Typography variant="h3">Warnung</Typography>
              <HtmlView value={page.page_warning.body} />
            </>
          )}
          {Boolean(page.pdf) && (
            <Typography
              variant="body2"
              fontWeight="regular"
              mt={2}
              display="flex"
              alignItems="center"
              gap={1}
            >
              <img
                src="/images/files/pdf.png"
                alt={`${page.name} als PDF speichern`}
                title={`${page.name} als PDF speichern`}
              />
              <MaterialLink
                underline="hover"
                style={{ cursor: 'pointer' }}
              >
                {`${page.name} als PDF speichern`}
              </MaterialLink>
            </Typography>
          )}
          <AuthorView value={page.author} />
          <Typography variant="h3" mb={2}>
            {i18n('entities.home.top_brokers')}
          </Typography>
          <TopBrokersView rows={props.topBrokers} />
        </Box>
      )}
      {!category && !page && brokerArticle && (
        <Box display="flex" flexDirection="column" gap={2}>
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
          <Typography variant="h3" mb={2}>
            {i18n('entities.home.top_brokers')}
          </Typography>
          <TopBrokersView rows={props.topBrokers} />
        </Box>
      )}
    </Layout>
  );
};

export default GeneralPage;
