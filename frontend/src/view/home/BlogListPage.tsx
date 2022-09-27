import { Card, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import actions from 'src/modules/blog/home/blogHomeActions';
import HtmlView from 'src/view/shared/view/HtmlView';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import Pagination from 'src/view/shared/table/Pagination';
import selectors from 'src/modules/blog/home/blogHomeSelectors';
import Spinner from 'src/view/shared/Spinner';

const BlogListPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loading = useSelector(selectors.selectLoading);

  const records = useSelector(selectors.selectRows);

  const pagination = useSelector(
    selectors.selectPagination,
  );

  useEffect(() => {
    dispatch(actions.doFetch());
    setDispatched(true);
  }, [dispatched]);

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  return (
    <PageLayout fixedNavBar={false}>
      <Container>
        <Card>
          <MDBox p={5}>
            {loading && <Spinner />}
            {dispatched && !loading && records && (
              <MDBox
                display="flex"
                flexDirection="column"
                gap={5}
              >
                {records.map((record) => (
                  <MDBox
                    key={record.id}
                    display="flex"
                    justifyContent="flex-start"
                    gap={5}
                  >
                    <img
                      src={record.blog_image[0].downloadUrl}
                      width="150px"
                    />
                    <MDBox color="text">
                      <MDTypography variant="h4">
                        <MaterialLink
                          component={Link}
                          to={`/blog/${record.name_normalized}`}
                          underline="hover"
                        >
                          {record.name}
                        </MaterialLink>
                      </MDTypography>
                      <HtmlView value={record.teaser} />
                    </MDBox>
                  </MDBox>
                ))}
              </MDBox>
            )}
            <Pagination
              onChange={doChangePagination}
              disabled={loading}
              pagination={pagination}
              entriesPerPage
              showTotalEntries
            />
          </MDBox>
        </Card>
      </Container>
    </PageLayout>
  );
};

export default BlogListPage;
