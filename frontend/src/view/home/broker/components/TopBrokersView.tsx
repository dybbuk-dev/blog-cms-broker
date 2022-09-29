import { CardContent, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import brokerTopSelectors from 'src/modules/broker/top/brokerTopSelectors';
import ImageView from 'src/view/home/ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import OverallRating from 'src/view/home/broker/shared/OverallRating';
import Spinner from 'src/view/shared/Spinner';
import ThemeColorAvatar from 'src/view/home/shared/ThemeColorAvatar';

function TopBrokersView() {
  const loading = useSelector(
    brokerTopSelectors.selectLoading,
  );
  const hasRows = useSelector(
    brokerTopSelectors.selectHasRows,
  );
  const rows = useSelector(brokerTopSelectors.selectRows);
  return (
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
                  flexDirection="row"
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
                        width: '141px',
                        height: '70px',
                      }}
                    />
                  </MaterialLink>
                  <OverallRating
                    record={row}
                    hideDescription
                    hidePercent
                  />
                  <MDBox
                    display="flex"
                    alignItems="center"
                    gap={1}
                  >
                    <MDTypography
                      variant="body2"
                      fontWeight="regular"
                    >
                      <MaterialLink
                        component={Link}
                        to={`/erfahrungsberichte/${row.name_normalized}`}
                        underline="hover"
                      >
                        {row.name}
                      </MaterialLink>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Grid>
          ))}
        </Grid>
      )}
    </CardContent>
  );
}

TopBrokersView.propTypes = {};

export default TopBrokersView;
