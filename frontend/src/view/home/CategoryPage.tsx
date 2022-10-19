import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Breadcrumb from 'src/view/home/Breadcrumb';
import BrokerListTable from 'src/view/home/broker/BrokerListTable';
import TopBrokersView from 'src/view/home/broker/components/TopBrokersView';
import DefaultCategoryDescription from 'src/view/home/DefaultCategoryDescription';
import AuthorView from 'src/view/shared/view/AuthorView';
import HtmlView from 'src/view/shared/view/HtmlView';
import PageContent from 'src/view/shared/view/PageContent';

function CategoryPage({ category }) {
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
