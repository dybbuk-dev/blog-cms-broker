import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import pageHomeActions from 'src/modules/page/home/pageHomeActions';
import pageHomeSelectors from 'src/modules/page/home/pageHomeSelectors';
import Spinner from 'src/view/shared/Spinner';
import HtmlView from 'src/view/shared/view/HtmlView';

const GeneralPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loading = useSelector(
    pageHomeSelectors.selectLoading,
  );

  const record = useSelector(
    pageHomeSelectors.selectRecord,
  );

  useEffect(() => {
    dispatch(pageHomeActions.doFind(match.url));
    setDispatched(true);
  }, [match.url]);

  return (
    <PageLayout fixedNavBar={false}>
      <Container>
        {loading && <Spinner />}
        {dispatched && !loading && record && (
          <HtmlView value={record.body} />
        )}
      </Container>
    </PageLayout>
  );
};

export default GeneralPage;
