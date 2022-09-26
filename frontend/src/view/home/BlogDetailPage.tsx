import { Card, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import blogFindActions from 'src/modules/blog/find/blogFindActions';
import blogFindSelectors from 'src/modules/blog/find/blogFindSelectors';
import Spinner from 'src/view/shared/Spinner';
import HtmlView from 'src/view/shared/view/HtmlView';
import SimpleBlogCard from 'src/mui/examples/Cards/BlogCards/SimpleBlogCard';
import MDBox from 'src/mui/components/MDBox';

const BlogDetailPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loading = useSelector(
    blogFindSelectors.selectLoading,
  );

  const record = useSelector(
    blogFindSelectors.selectRecord,
  );

  useEffect(() => {
    dispatch(blogFindActions.doFind(match.url));
    setDispatched(true);
  }, [match.url]);

  return (
    <PageLayout fixedNavBar={false}>
      <Container>
        <Card>
          <MDBox p={5} color="text">
            {loading && <Spinner />}
            {dispatched && !loading && record && (
              <HtmlView value={record.content} />
            )}
          </MDBox>
        </Card>
      </Container>
    </PageLayout>
  );
};

export default BlogDetailPage;
