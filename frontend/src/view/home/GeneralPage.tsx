import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AuthorView from 'src/view/shared/view/AuthorView';
import categoryHomeActions from 'src/modules/category/home/categoryHomeActions';
import categoryHomeSelectors from 'src/modules/category/home/categoryHomeSelectors';
import HtmlView from 'src/view/shared/view/HtmlView';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';
import pageHomeSelectors from 'src/modules/page/home/pageHomeSelectors';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import Spinner from 'src/view/shared/Spinner';

const GeneralPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loadingCategory = useSelector(
    categoryHomeSelectors.selectLoading,
  );
  const category = useSelector(
    categoryHomeSelectors.selectRecord,
  );

  const loadingPage = useSelector(
    pageHomeSelectors.selectLoading,
  );
  const page = useSelector(pageHomeSelectors.selectRecord);

  const loading = loadingCategory || loadingPage;

  useEffect(() => {
    dispatch(categoryHomeActions.doFind(match.url));
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
          {dispatched && !loading && category && (
            <>
              <PageContent>
                <MDTypography variant="h1">
                  {category.title}
                </MDTypography>
                {category.teaser && (
                  <HtmlView value={category.teaser} />
                )}
                {category.description && (
                  <HtmlView value={category.description} />
                )}
              </PageContent>
              <AuthorView value={category.author} />
            </>
          )}
          {dispatched && !loading && !category && page && (
            <>
              <PageContent>
                <HtmlView value={page.body} />
              </PageContent>
              <AuthorView value={page.author} />
            </>
          )}
        </MDBox>
      </Container>
    </PageLayout>
  );
};

export default GeneralPage;
