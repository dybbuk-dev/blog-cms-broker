import { Card, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import brokerTopSelectors from 'src/modules/broker/top/brokerTopSelectors';
import CircleNumber from 'src/view/home/shared/CircleNumber';
import ImageView from 'src/view/home/ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import RatingViewItem from 'src/view/shared/view/RatingViewItem';
import Spinner from 'src/view/shared/Spinner';

function TopBrokers() {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    brokerTopSelectors.selectLoading,
  );
  const hasRows = useSelector(
    brokerTopSelectors.selectHasRows,
  );
  const rows = useSelector(brokerTopSelectors.selectRows);
  return (
    <Card>
      <CardHeader
        title={
          <MDTypography
            variant="body1"
            fontWeight="bold"
            lineHeight={1.35}
          >
            Von Tradern am besten bewertet
          </MDTypography>
        }
        sx={{ pb: 1, px: 3, pt: 2 }}
      />
      <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
        {loading && <Spinner />}
        {!loading && hasRows && (
          <Grid spacing={2} container>
            {rows.map((row, idx) => (
              <Grid key={row.id} xs={12} item>
                <MDBox
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap={2}
                  mb={1}
                >
                  <CircleNumber>{idx + 1}</CircleNumber>
                  <MDBox flexGrow={1}>
                    <MaterialLink
                      href={row.meta?.homepage}
                      target="_blank"
                    >
                      <MDBox
                        position="relative"
                        width="100%"
                        pb="46.67%"
                      >
                        <ImageView
                          value={
                            row.broker_image_top_broker_logo
                          }
                          sx={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </MDBox>
                    </MaterialLink>
                  </MDBox>
                </MDBox>
                <MDBox
                  display="flex"
                  justifyContent="flex-start"
                  sx={{
                    '& > * + *': {
                      ml: 2,
                    },
                  }}
                >
                  <MDBox
                    width="50px"
                    flexShrink={0}
                  ></MDBox>
                  <MDBox
                    display="flex"
                    flexGrow={1}
                    flexDirection="column"
                    sx={{
                      '& > * + *': {
                        mt: 1,
                      },
                    }}
                  >
                    <MDBox mx="auto">
                      <RatingViewItem
                        value={row.rating?.overall_rating}
                        precision={0.1}
                        emptyIcon={
                          <img
                            src="/images/star-grey.png"
                            height="24px"
                          />
                        }
                        icon={
                          <img
                            src="/images/star-fill.png"
                            height="24px"
                          />
                        }
                        size="large"
                      />
                    </MDBox>
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      lineHeight={1}
                      color={sidenavColor}
                      mx="auto"
                      mt={1}
                    >
                      <MaterialLink
                        component={Link}
                        to={`/erfahrungsberichte/${row.name_normalized}`}
                        underline="hover"
                      >
                        {`${row.name
                          .replace(/\([\w\d\s]+\)/g, '')
                          .trim()} Erfahrungen`}
                      </MaterialLink>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        )}
      </MDBox>
    </Card>
  );
}

TopBrokers.propTypes = {};

export default TopBrokers;
