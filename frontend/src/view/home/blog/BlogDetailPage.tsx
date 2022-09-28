import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AuthorView from 'src/view/shared/view/AuthorView';
import blogFindActions from 'src/modules/blog/find/blogFindActions';
import blogFindSelectors from 'src/modules/blog/find/blogFindSelectors';
import CommentPage from 'src/view/home/blog/CommentPage';
import HtmlView from 'src/view/shared/view/HtmlView';
import MDBox from 'src/mui/components/MDBox';
import PageContent from 'src/view/shared/view/PageContent';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import Spinner from 'src/view/shared/Spinner';

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
        <MDBox
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {loading && <Spinner />}
          {dispatched && !loading && record && (
            <>
              <PageContent>
                <HtmlView value={record.content} />
                <CommentPage record={record} />
              </PageContent>
              <AuthorView value={record.author} />
            </>
          )}
        </MDBox>
      </Container>
    </PageLayout>
  );
};

export default BlogDetailPage;
