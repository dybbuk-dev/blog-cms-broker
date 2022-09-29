import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import PropTypes from 'prop-types';
import TopBrokers from 'src/view/home/sidebar/TopBrokers';

function Layout({ children }) {
  return (
    <PageLayout fixedNavBar={false}>
      <Container>
        <Grid spacing={2} container>
          <Grid lg={9} md={8} xs={12} item>
            {children}
          </Grid>
          <Grid lg={3} md={4} xs={12} item>
            <Grid spacing={2} container>
              <Grid xs={12} item>
                <TopBrokers />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
