import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import AuthorView from 'src/view/shared/view/AuthorView';
import Breadcrumb from 'src/view/home/Breadcrumb';
import BrokerListTable from 'src/view/home/broker/BrokerListTable';
import categorySidebarSelectors from 'src/modules/category/sidebar/categorySidebarSelectors';
import DefaultCategoryDescription from 'src/view/home/DefaultCategoryDescription';
import HtmlView from 'src/view/shared/view/HtmlView';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';
import Spinner from 'src/view/shared/Spinner';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';

function CategoryPage({ category }) {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    categorySidebarSelectors.selectLoading,
  );
  const record = useSelector(
    categorySidebarSelectors.selectRecord,
  );
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
        ) : (
          <HtmlView
            value={i18n(
              'entities.category.placeholders.description',
              category.name,
            )}
          />
        )}
        <MDTypography display="block" variant="h3" my={2}>
          {i18n('entities.home.top_brokers')}
        </MDTypography>
        <TopBrokersView />
        <BrokerListTable category={category.id} />
        <MDTypography display="block" variant="h3" mt={2}>
          Broker-Kategorien
        </MDTypography>
        <MDBox>
          {loading && <Spinner />}
          {!loading &&
            record?.count > 0 &&
            record?.rows.map((cat) => (
              <MDTypography
                key={cat.id}
                variant="body2"
                color={sidenavColor}
                fontWeight="regular"
              >
                <MaterialLink
                  component={Link}
                  to={cat.link}
                  underline="hover"
                >
                  {cat.name}
                </MaterialLink>
              </MDTypography>
            ))}
        </MDBox>
        {category.description ? (
          <HtmlView value={category.description} />
        ) : (
          <DefaultCategoryDescription />
        )}
      </PageContent>
      <AuthorView value={category.author} />
    </MDBox>
  );
}

export default CategoryPage;
