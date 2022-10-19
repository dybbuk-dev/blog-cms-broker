import { Box, Typography } from '@mui/material';
import { i18n } from '../i18n';
import AuthorView from './shared/AuthorView';
import Breadcrumb from './Breadcrumb';
import BrokerListTable from './broker/BrokerListTable';
import DefaultCategoryDescription from './DefaultCategoryDescription';
import HtmlView from './shared/HtmlView';
import MaterialLink from '@mui/material/Link';
import React from 'react';
import TopBrokersView from './broker/components/TopBrokersView';

function CategoryPage({ category, ...props }) {
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
        {category.teaser ? (
          <HtmlView value={category.teaser} />
        ) : (
          <HtmlView
            value={i18n(
              'entities.category.placeholders.description',
              category.name,
            )}
          />
        )}
        <Typography display="block" variant="h3" my={2}>
          {i18n('entities.home.top_brokers')}
        </Typography>
        <TopBrokersView />
        <BrokerListTable rows={props.brokers} />
        <Typography display="block" variant="h3" mt={2}>
          Broker-Kategorien
        </Typography>
        <Box>
          {props.categories?.map((cat) => (
            <Typography
              key={cat.id}
              variant="body2"
              fontWeight="regular"
            >
              <MaterialLink
                href={cat.link}
                underline="hover"
              >
                {cat.name}
              </MaterialLink>
            </Typography>
          ))}
        </Box>
        {category.description ? (
          <HtmlView value={category.description} />
        ) : (
          <DefaultCategoryDescription />
        )}
      </>
      <AuthorView value={category.author} />
    </Box>
  );
}

export default CategoryPage;
