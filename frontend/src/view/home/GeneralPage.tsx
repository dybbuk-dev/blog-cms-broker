import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import AuthorView from 'src/view/shared/view/AuthorView';
import Breadcrumb from 'src/view/home/Breadcrumb';
import brokerArticleHomeSelectors from 'src/modules/brokerArticle/home/brokerArticleHomeSelectors';
import BrokerListTable from 'src/view/home/broker/BrokerListTable';
import categoryHomeActions from 'src/modules/category/home/categoryHomeActions';
import categoryHomeSelectors from 'src/modules/category/home/categoryHomeSelectors';
import HtmlView from 'src/view/shared/view/HtmlView';
import Layout from 'src/view/home/Layout';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import PageContent from 'src/view/shared/view/PageContent';
import pageHomeSelectors from 'src/modules/page/home/pageHomeSelectors';
import Spinner from 'src/view/shared/Spinner';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import config from 'src/config';
import PageService from 'src/modules/page/pageService';
import pageHomeActions from 'src/modules/page/home/pageHomeActions';
import urlParse from 'url-parse';
import ScrollTo from 'src/ScrollTo';

const GeneralPage = () => {
  const { sidenavColor } = selectMuiSettings();
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
    const handleOnClickA = (evt) => {
      if (evt.target.tagName.toLowerCase() === 'a') {
        const parsedUrl = urlParse(evt.target.href);
        if (
          parsedUrl.pathname === match.url &&
          parsedUrl.hash !== ''
        ) {
          evt.preventDefault();
          evt.stopPropagation();
          evt.stopImmediatePropagation();
          ScrollTo(decodeURI(parsedUrl.hash.substring(1)));
        }
      }
    };
    window.addEventListener('click', handleOnClickA);
    return () =>
      window.removeEventListener('click', handleOnClickA);
  }, [match.url]);

  const handleDownloadPagePDF = () => {
    if (page?.navigation) {
      dispatch(
        pageHomeActions.doDownload(
          `${page.navigation.link}.pdf`,
        ),
      );
    }
  };

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
              {Boolean(page.related_links.length) && (
                <>
                  <MDTypography variant="h4" my={2}>
                    {page.navigation.type ===
                    'FOREX_STRATEGY'
                      ? 'Weitere Forex Strategien'
                      : page.navigation.type === 'DOWNLOADS'
                      ? 'Weitere MetaTrader Indikatoren'
                      : ''}
                  </MDTypography>
                  {page.related_links.map(
                    ({ name, url }, idx) => (
                      <MDTypography
                        key={idx}
                        variant="body2"
                        color={sidenavColor}
                        fontWeight="regular"
                      >
                        <MaterialLink
                          href={url}
                          target="_blank"
                        >
                          {name}
                        </MaterialLink>
                      </MDTypography>
                    ),
                  )}
                </>
              )}
              {Boolean(page.page_warning) && (
                <>
                  <MDTypography variant="h4" my={2}>
                    Warnung
                  </MDTypography>
                  <HtmlView
                    value={page.page_warning.body}
                  />
                </>
              )}
              {Boolean(page.pdf) && (
                <MDTypography
                  variant="body2"
                  color={sidenavColor}
                  fontWeight="regular"
                  mt={2}
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <img src="/images/files/pdf.png" />
                  <MaterialLink
                    onClick={handleDownloadPagePDF}
                    underline="hover"
                    style={{ cursor: 'pointer' }}
                  >
                    {`${page.name} als PDF speichern`}
                  </MaterialLink>
                </MDTypography>
              )}
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
