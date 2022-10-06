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
import CircleNumber from 'src/view/home/shared/CircleNumber';

function TopBrokersView() {
  const loading = useSelector(
    brokerTopSelectors.selectLoading,
  );
  const hasRows = useSelector(
    brokerTopSelectors.selectHasRows,
  );
  const rows = useSelector(brokerTopSelectors.selectRows);
  return (
    <>
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
                <MDBox
                  display="flex"
                  flexGrow={1}
                  flexDirection="row"
                  gap={2}
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
                        width: '250px',
                        objectFit: 'contain',
                      }}
                    />
                  </MaterialLink>
                  <ImageView
                    value={
                      row.broker_image_broker_regulation_image
                    }
                    sx={{
                      objectFit: 'contain',
                    }}
                  />
                  <MDBox
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    <OverallRating
                      record={row}
                      hideDescription
                      hidePercent
                    />
                    <MDTypography
                      variant="button"
                      color="text"
                      fontWeight="regular"
                      lineHeight={1.5}
                    >
                      <MaterialLink
                        component={Link}
                        to={`/erfahrungsberichte/${row.name_normalized}`}
                        underline="hover"
                      >
                        {`${row.rating?.overall_reviews} Erfahrungsberichte lesen`}
                      </MaterialLink>
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

TopBrokersView.propTypes = {};

export default TopBrokersView;
