import { i18n } from '../../i18n';
import Box from '@mui/material/Box';
import HtmlView from '../shared/HtmlView';
import Layout from '../Layout';
import MaterialLink from '@mui/material/Link';
import React from 'react';
import Typography from '@mui/material/Typography';

const BlogListPage = ({ records }) => {
  return (
    <Layout title="Broker-Bewertungen Blog">
      <Typography variant="h2" pb={5}>
        {i18n('entities.blog.title')}
      </Typography>
      <>
        <Box display="flex" flexDirection="column" gap={5}>
          {records.map((record) => (
            <Box
              key={record.id}
              display="flex"
              justifyContent="flex-start"
              gap={5}
            >
              {record.blog_image[0]?.downloadUrl && (
                <img
                  src={record.blog_image[0].downloadUrl}
                  width="150px"
                />
              )}

              <Box color="text">
                <Typography variant="h4">
                  <MaterialLink
                    href={`/blog/${record.name_normalized}`}
                    underline="hover"
                  >
                    {record.name}
                  </MaterialLink>
                </Typography>
                <HtmlView value={record.teaser} />
              </Box>
            </Box>
          ))}
        </Box>
      </>
    </Layout>
  );
};

export default BlogListPage;
