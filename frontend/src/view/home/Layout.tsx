import { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Advisors from 'src/view/home/sidebar/Advisors';
import Category from 'src/view/home/sidebar/Category';
import ComparableBrokers from 'src/view/home/sidebar/ComparableBrokers';
import Container from '@mui/material/Container';
import FeaturedBrokers from 'src/view/home/sidebar/FeaturedBrokers';
import ForexSchool from 'src/view/home/sidebar/ForexSchool';
import ForexStrategy from 'src/view/home/sidebar/ForexStrategy';
import Grid from '@mui/material/Grid';
import Meta from 'src/view/home/Meta';
import MostRead from 'src/view/home/sidebar/MostRead';
import PageLayout from 'src/mui/examples/LayoutContainers/PageLayout';
import PropTypes from 'prop-types';
import ScrollTo from 'src/ScrollTo';
import TopBrokers from 'src/view/home/sidebar/TopBrokers';

function Layout({
  title,
  keywords,
  description,
  record,
  children,
  noIndex = false,
}) {
  const match = useRouteMatch();
  useEffect(() => {
    ScrollTo();
  }, [match.url]);
  return (
    <PageLayout fixedNavBar={false}>
      <Meta
        title={title}
        keywords={keywords}
        description={description}
        noIndex={noIndex}
      />
      <Container>
        <Grid spacing={2} container>
          <Grid xl={9} lg={8} md={12} xs={12} item>
            {children}
          </Grid>
          <Grid xl={3} lg={4} md={12} xs={12} item>
            <Grid spacing={2} container>
              <Grid xs={12} item>
                <TopBrokers />
              </Grid>
              {Boolean(record) && (
                <Grid xs={12} item>
                  <ComparableBrokers record={record} />
                </Grid>
              )}
              <Grid xs={12} item>
                <FeaturedBrokers />
              </Grid>
              {Boolean(record) && (
                <Grid xs={12} item>
                  <Advisors record={record} />
                </Grid>
              )}
              <Grid xs={12} item>
                <Category />
              </Grid>
              <Grid xs={12} item>
                <MostRead />
              </Grid>
              <Grid xs={12} item>
                <ForexSchool />
              </Grid>
              <Grid xs={12} item>
                <ForexStrategy />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  record: PropTypes.any,
  children: PropTypes.any,
  noIndex: PropTypes.bool,
};

export default Layout;
