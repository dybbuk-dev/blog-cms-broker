import { Box, Typography } from '@mui/material';
import { i18n } from '../i18n';
import AuthorView from './shared/AuthorView';
import Breadcrumb from './Breadcrumb';
import HtmlView from './shared/HtmlView';
import MaterialLink from '@mui/material/Link';
import React from 'react';
import TopBrokersView from './broker/components/TopBrokersView';

function NormalPage({ page, ...props }) {
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
      <>
        <Breadcrumb {...props} />
        <HtmlView value={page.body} />
        {Boolean(page.related_links.length) && (
          <Box>
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
            <img src="/images/files/pdf.png" />
            <MaterialLink
              href={`${
                page.navigation?.link || page.link
              }.pdf`}
              underline="hover"
              style={{ cursor: 'pointer' }}
            >
              {`${page.name} als PDF speichern`}
            </MaterialLink>
          </Typography>
        )}
      </>
      <AuthorView value={page.author} />
      <Typography display="block" variant="h3" mb={2}>
        {i18n('entities.home.top_brokers')}
      </Typography>
      <TopBrokersView rows={props.topBrokers} />
    </Box>
  );
}

export default NormalPage;
