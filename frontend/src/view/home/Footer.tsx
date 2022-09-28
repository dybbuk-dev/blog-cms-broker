import { i18n } from 'src/i18n';
import config from 'src/config';
import Container from '@mui/material/Container';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';

function Footer() {
  return (
    <Container>
      <MDBox
        display="flex"
        flexDirection="column"
        gap={2}
        my={2}
      >
        <PageContent>
          <MDTypography
            variant="body2"
            fontWeight="regular"
          >
            {i18n(
              'footer.description',
              config.frontendUrl.host,
            )}
          </MDTypography>
        </PageContent>
      </MDBox>
    </Container>
  );
}

export default Footer;
