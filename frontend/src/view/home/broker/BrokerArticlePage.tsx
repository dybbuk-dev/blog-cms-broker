import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import action from 'src/modules/brokerArticle/home/brokerArticleHomeActions';
import selector from 'src/modules/brokerArticle/home/brokerArticleHomeSelectors';
import AuthorView from 'src/view/shared/view/AuthorView';
import HtmlView from 'src/view/shared/view/HtmlView';
import MDButton from 'src/mui/components/MDButton';
import SendIcon from '@mui/icons-material/Send';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import PageContent from 'src/view/shared/view/PageContent';

const BrokerArticlePage = ({ record }) => {
  const { sidenavColor } = selectMuiSettings();
  const rows = useSelector(selector.selectRecord);
  const loading = useSelector(selector.selectInitLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      action.doInit({
        activated: true,
        broker_id: record.id,
      }),
    );
  }, [record.id]);
  return (
    <>
      <PageContent>
        {!loading && rows?.content !== undefined && (
          <HtmlView value={rows?.content} />
        )}
      </PageContent>

      {!loading && rows?.author !== undefined && (
        <AuthorView value={rows?.author} />
      )}
    </>
  );
};

export default BrokerArticlePage;
