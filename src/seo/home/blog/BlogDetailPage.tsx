import { i18n } from '../../i18n';
import AuthorView from '../shared/AuthorView';
import Box from '@mui/material/Box';
import HtmlView from '../shared/HtmlView';
import Layout from '../Layout';
import React from 'react';
import TopBrokersView from '../broker/components/TopBrokersView';

const BlogDetailPage = ({ record, ...props }) => {
  return (
    <>
      <Layout
        title={record?.name}
        keywords={[record?.metakeywords]}
        description={record?.metadescription}
        author={record?.author}
      >
        {record && (
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <>
              <HtmlView value={record.content} />
              <AuthorView value={record.author} />
              <h3>{i18n('entities.home.top_brokers')}</h3>
              <TopBrokersView rows={props.topBrokers} />
            </>
          </Box>
        )}
      </Layout>
    </>
  );
};

export default BlogDetailPage;
