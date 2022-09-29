import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import categoryFooterSelectors from 'src/modules/category/footer/categoryFooterSelectors';
import config from 'src/config';
import Container from '@mui/material/Container';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';

function Footer() {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    categoryFooterSelectors.selectLoading,
  );
  const categories = useSelector(
    categoryFooterSelectors.selectRecord,
  );
  return (
    <Container>
      <MDBox
        display="flex"
        flexDirection="column"
        gap={2}
        my={2}
      >
        <MDBox p={5} color="text">
          <MDTypography
            variant="body2"
            fontWeight="regular"
          >
            {i18n(
              'footer.description',
              config.frontendUrl.host,
            )}
          </MDTypography>

          {!loading && categories && categories.count && (
            <MDBox
              display="inline-flex"
              flexWrap="wrap"
              py={2}
              gap={2}
            >
              {categories.rows.map((cat) => (
                <MDTypography
                  key={cat.id}
                  variant="body2"
                  color={sidenavColor}
                  lineHeight={1}
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
          )}
        </MDBox>
      </MDBox>
    </Container>
  );
}

export default Footer;
