import { Container, Grid } from '@mui/material';
import MaterialLink from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import actions from 'src/modules/blog/home/blogHomeActions';
import selectors from 'src/modules/blog/home/blogHomeSelectors';
import Spinner from 'src/view/shared/Spinner';
import HtmlView from 'src/view/shared/view/HtmlView';
import Pagination from 'src/view/shared/table/Pagination';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';
import ImagesViewItem from 'src/view/shared/view/ImagesViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDButton from 'src/mui/components/MDButton';
import HtmlViewItem from 'src/view/shared/view/HtmlViewItem';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import { i18n } from 'src/i18n';

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
        <Pagination
          onChange={doChangePagination}
          disabled={loading}
          pagination={pagination}
          entriesPerPage
          showTotalEntries
        />
      </Container>
      <Container>
        {loading && <Spinner />}
        {dispatched &&
          !loading &&
          records &&
          records.map((record) => (
            <FieldSetViewItem key={record.id}>
              <MaterialLink
                component={Link}
                to={record.name_normalized}
              >
                <TextViewItem value={record.name} />
              </MaterialLink>
              <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                  <LogoViewItem
                    value={record.blog_image[0]}
                  />
                </Grid>
                <Grid item md={8} xs={12}>
                  <HtmlViewItem value={record.teaser} />
                </Grid>
                <Grid item md={12} xs={12}>
                  <MDButton
                    variant="outlined"
                    color={'primary'}
                    component={Link}
                    to={`/blog/${record.name_normalized}`}
                    size="large"
                  >
                    {i18n('common.detail')}
                  </MDButton>
                </Grid>
              </Grid>
            </FieldSetViewItem>
          ))}
      </Container>
      <Container>
        <Pagination
          onChange={doChangePagination}
          disabled={loading}
          pagination={pagination}
          entriesPerPage
          showTotalEntries
        />
      </Container>
    </PageLayout>
  );
};

export default BlogListPage;
