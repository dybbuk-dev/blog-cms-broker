import {
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import brokerTopSelectors from 'src/modules/broker/top/brokerTopSelectors';
import ImageView from 'src/view/home/ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import OverallRating from 'src/view/home/broker/shared/OverallRating';
import Spinner from 'src/view/shared/Spinner';
import CircleNumber from 'src/view/home/shared/CircleNumber';

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
      <CardHeader title="Von Tradern am besten bewertet" />
      <CardContent>
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
                  gap={2}
                >
                  <MDBox
                    width="50px"
                    flexShrink={0}
                  ></MDBox>
                  <MDBox
                    display="flex"
                    flexGrow={1}
                    flexDirection="column"
                    gap={1}
                  >
                    <OverallRating
                      record={row}
                      hideDescription
                      hidePercent
                    />
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      lineHeight={1}
                      color={sidenavColor}
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
      </CardContent>
    </Card>
  );
}

TopBrokers.propTypes = {};

export default TopBrokers;
