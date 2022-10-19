import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import Breadcrumb from 'src/view/home/Breadcrumb';
import HtmlView from 'src/view/shared/view/HtmlView';
import PageContent from 'src/view/shared/view/PageContent';
import AuthorView from 'src/view/shared/view/AuthorView';

function BrokerArticlePage({ brokerArticle }) {
  return (
    <MDBox
      display="flex"
      flexDirection="column"
      sx={{
        '& > * + *': {
          mt: 2,
        },
      }}
    >
      <PageContent>
        <Breadcrumb
          items={[
            {
              name: brokerArticle.broker.name,
              route: `/erfahrungsberichte/${brokerArticle.broker.name_normalized}`,
            },
            {
              name: brokerArticle.name,
              route: `/${brokerArticle.broker.name_normalized}/${brokerArticle.name_normalized}`,
            },
          ]}
        />
        <HtmlView value={brokerArticle.content} />
      </PageContent>
      <AuthorView value={brokerArticle.author} />
      <PageContent
        display={{
          xs: 'none',
          lg: 'block',
        }}
      >
        <MDTypography display="block" variant="h3" mb={2}>
          {i18n('entities.home.top_brokers')}
        </MDTypography>
        <TopBrokersView />
      </PageContent>
    </MDBox>
  );
}

export default BrokerArticlePage;
