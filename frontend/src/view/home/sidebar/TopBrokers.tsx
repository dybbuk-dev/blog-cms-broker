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
import ThemeColorAvatar from 'src/view/home/shared/ThemeColorAvatar';

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
                  gap={2}
                >
                  <ThemeColorAvatar>
                    {idx + 1}
                  </ThemeColorAvatar>
                  <MDBox
                    display="flex"
                    flexGrow={1}
                    flexDirection="column"
                    gap={1}
                  >
                    <MaterialLink
                      href={row.meta?.homepage}
                      target="_blank"
                    >
                      <ImageView
                        value={
                          row.broker_image_broker_detail_logo
                        }
                        sx={{
                          width: '100%',
                        }}
                      />
                    </MaterialLink>
                    <OverallRating
                      record={row}
                      hideDescription
                      hidePercent
                    />
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                      color={sidenavColor}
                    >
                      <MaterialLink
                        component={Link}
                        to={`/erfahrungsberichte/${row.name_normalized}`}
                        underline="hover"
                      >
                        {`${row.name} Erfahrungen`}
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
