import { i18n } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AuthorView from 'src/view/shared/view/AuthorView';
import BrokerListTable from 'src/view/home/broker/BrokerListTable';
import categoryHomeActions from 'src/modules/category/home/categoryHomeActions';
import categoryHomeSelectors from 'src/modules/category/home/categoryHomeSelectors';
import HtmlView from 'src/view/shared/view/HtmlView';
import Layout from 'src/view/home/Layout';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';
import pageHomeSelectors from 'src/modules/page/home/pageHomeSelectors';
import Spinner from 'src/view/shared/Spinner';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import Breadcrumb from 'src/view/home/Breadcrumb';
import moment from 'moment';
import brokerArticleHomeSelectors from 'src/modules/brokerArticle/home/brokerArticleHomeSelectors';

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

  const loadingArticle = useSelector(
    brokerArticleHomeSelectors.selectLoading,
  );
  const brokerArticle = useSelector(
    brokerArticleHomeSelectors.selectRecord,
  );

  const loading =
    loadingCategory || loadingPage || loadingArticle;

  useEffect(() => {
    dispatch(categoryHomeActions.doFind(match.url));
    setDispatched(true);
  }, [match.url]);

  return (
    <>
      {loading && <Spinner />}
      {dispatched && !loading && category && (
        <Layout
          title={`${
            category.title
          } Vergleich ${moment().year()} » 100% unabhängiger Test`}
          keywords={[category.name, 'Vergleich', 'Test']}
          description={`100% unabhängiger ${
            category.title
          } Vergleich ✚✚ Über ${category.count ?? 0} ${
            category.title
          } im Test mit Erfahrungsberichten von Tradern ➔ Jetzt lesen!`}
        >
          <MDBox
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <PageContent>
              <Breadcrumb
                items={[
                  {
                    name: category.name,
                    route: category.link,
                  },
                ]}
              />
              <MDTypography variant="h2">
                {category.title}
              </MDTypography>
              {category.teaser && (
                <HtmlView value={category.teaser} />
              )}
              <MDTypography variant="h4" my={2}>
                {i18n('entities.home.top_brokers')}
              </MDTypography>
              <TopBrokersView />
              <BrokerListTable category={category.id} />
              {category.description && (
                <HtmlView value={category.description} />
              )}
            </PageContent>
            <AuthorView value={category.author} />
          </MDBox>
        </Layout>
      )}
      {dispatched && !loading && !category && page && (
        <Layout
          title={page.title}
          keywords={[page.meta_keywords]}
          description={page.meta_description}
        >
          <MDBox
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <PageContent>
              <Breadcrumb />
              <HtmlView value={page.body} />
            </PageContent>
            <AuthorView value={page.author} />
            <PageContent>
              <MDTypography variant="h4" mb={2}>
                {i18n('entities.home.top_brokers')}
              </MDTypography>
              <TopBrokersView />
            </PageContent>
          </MDBox>
        </Layout>
      )}
      {dispatched &&
        !loading &&
        !category &&
        !page &&
        brokerArticle && (
          <Layout
            title={brokerArticle.pagetitle}
            keywords={[brokerArticle.metakeywords]}
            description={brokerArticle.metadescription}
          >
            <MDBox
              display="flex"
              flexDirection="column"
              gap={2}
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
              <PageContent>
                <MDTypography variant="h4" mb={2}>
                  {i18n('entities.home.top_brokers')}
                </MDTypography>
                <TopBrokersView />
              </PageContent>
            </MDBox>
          </Layout>
        )}
    </>
  );
};

export default GeneralPage;
