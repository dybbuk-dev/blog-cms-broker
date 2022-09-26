import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import categoryHomeActions from 'src/modules/category/home/categoryHomeActions';
import categoryHomeSelectors from 'src/modules/category/home/categoryHomeSelectors';
import HtmlView from 'src/view/shared/view/HtmlView';
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
        {loading && <Spinner />}
        {dispatched && !loading && category && (
          <HtmlView value={category.description} />
        )}
        {dispatched && !loading && !category && page && (
          <HtmlView value={page.body} />
        )}
      </Container>
    </PageLayout>
  );
};

export default GeneralPage;
