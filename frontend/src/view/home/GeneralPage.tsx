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
import HtmlView, {
  HtmlViewWrapper,
} from 'src/view/shared/view/HtmlView';
import Layout from 'src/view/home/Layout';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import PageContent from 'src/view/shared/view/PageContent';
import pageHomeSelectors from 'src/modules/page/home/pageHomeSelectors';
import Spinner from 'src/view/shared/Spinner';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import pageHomeActions from 'src/modules/page/home/pageHomeActions';
import urlParse from 'url-parse';
import ScrollTo from 'src/ScrollTo';
import lColors from 'src/mui/assets/theme/base/colors';
import dColors from 'src/mui/assets/theme-dark/base/colors';

const GeneralPage = () => {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const colors = darkMode ? dColors : lColors;
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
    if (page?.navigation || page.link !== '') {
      dispatch(
        pageHomeActions.doDownload(
          `${page.navigation?.link || page.link}.pdf`,
        ),
      );
    }
  };

  let title = '';
  let keywords = [];
  let description = '';

  if (dispatched && !loading) {
    if (category) {
      title = `${
        category.title
      } Vergleich ${moment().year()} » 100% unabhängiger Test`;
      keywords = [category.name, 'Vergleich', 'Test'];
      description = `100% unabhängiger ${
        category.title
      } Vergleich ✚✚ Über ${category.count ?? 0} ${
        category.title
      } im Test mit Erfahrungsberichten von Tradern ➔ Jetzt lesen!`;
    }

    if (!category && page) {
      title = page.title;
      keywords = [page.meta_keywords];
      description = page.meta_description;
    }

    if (!category && !page && brokerArticle) {
      title = brokerArticle.pagetitle;
      keywords = [brokerArticle.metakeywords];
      description = brokerArticle.metadescription;
    }
  }

  return (
    <>
      <Layout
        title={title}
        keywords={keywords}
        description={description}
      >
        {loading && <Spinner />}
        {dispatched && !loading && category && (
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
                    name: category.name,
                    route: category.link,
                  },
                ]}
              />
              <MDTypography variant="h2">
                {category.title}
              </MDTypography>
              {category.teaser ? (
                <HtmlView value={category.teaser} />
              ) : [
                  '/expert-advisors-vergleich',
                  '/forex-signale-vergleich',
                ].includes(category.link) ? (
                <HtmlView
                  value={i18n(
                    'entities.category.placeholders.description',
                    category.name,
                  )}
                />
              ) : null}
              <MDTypography
                display="block"
                variant="h3"
                my={2}
              >
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
        )}
        {dispatched && !loading && !category && page && (
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
              <Breadcrumb />
              <HtmlView value={page.body} />
              {Boolean(page.related_links.length) && (
                <MDBox
                  py={2}
                  my={2}
                  borderTop={`1px dashed ${colors.inputBorderColor}`}
                  borderBottom={`1px dashed ${colors.inputBorderColor}`}
                >
                  <MDTypography variant="h3">
                    {page.navigation.type ===
                    'FOREX_STRATEGY'
                      ? 'Weitere Forex Strategien'
                      : page.navigation.type === 'DOWNLOADS'
                      ? 'Weitere MetaTrader Indikatoren'
                      : 'Weiterführende Links'}
                  </MDTypography>
                  {page.related_links.map(
                    ({ name, url }, idx) => (
                      <MDTypography
                        key={idx}
                        variant="body2"
                        color={sidenavColor}
                        fontWeight="regular"
                      >
                        <MaterialLink href={url}>
                          {name}
                        </MaterialLink>
                      </MDTypography>
                    ),
                  )}
                </MDBox>
              )}
              {Boolean(page.page_warning) && (
                <>
                  <MDTypography variant="h3">
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
            <PageContent
              display={{
                xs: 'none',
                lg: 'block',
              }}
            >
              <MDTypography
                display="block"
                variant="h3"
                mb={2}
              >
                {i18n('entities.home.top_brokers')}
              </MDTypography>
              <TopBrokersView />
            </PageContent>
          </MDBox>
        )}
        {dispatched &&
          !loading &&
          !category &&
          !page &&
          brokerArticle && (
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
                <MDTypography
                  display="block"
                  variant="h3"
                  mb={2}
                >
                  {i18n('entities.home.top_brokers')}
                </MDTypography>
                <TopBrokersView />
              </PageContent>
            </MDBox>
          )}
      </Layout>
    </>
  );
};

export default GeneralPage;
