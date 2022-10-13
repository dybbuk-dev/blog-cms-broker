import { i18n } from 'src/i18n';
import ImageView from 'src/view/home/ImageView';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import OverallRating from 'src/view/home/broker/shared/OverallRating';
import SendIcon from '@mui/icons-material/Send';
import lColors from 'src/mui/assets/theme/base/colors';
import dColors from 'src/mui/assets/theme-dark/base/colors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { Grid } from '@mui/material';

function BrokerHeader({ record }) {
  const { darkMode } = selectMuiSettings();
  const colors = darkMode ? dColors : lColors;
  return (
    <MDBox
      py={2}
      borderTop={`1px dashed ${colors.inputBorderColor}`}
      borderBottom={`1px dashed ${colors.inputBorderColor}`}
    >
      <MDTypography variant="h1" mb={2}>
        {`${record.name} Erfahrungen und Test`}
      </MDTypography>
      <Grid spacing={3} alignItems="stretch" container>
        <Grid md={6} xs={12} item>
          <ImageView
            value={record.broker_image_broker_detail_logo}
            alt={record.name}
            sx={{
              width: {
                xs: '100%',
                sm: undefined,
              },
              height: {
                xs: undefined,
                sm: '100%',
              },
            }}
          />
        </Grid>
        <Grid md={6} xs={12} item>
          <MDBox
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-end"
            gap={{ xs: 1, md: 1.5, lg: 2 }}
          >
            <OverallRating record={record} size={42} />
            <MDButton
              variant="contained"
              href={record.meta?.homepage}
              color="info"
              target="_blank"
              startIcon={<SendIcon />}
              fullWidth
            >
              {i18n(
                'entities.broker.text.nowTo',
                record.name,
              )}
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default BrokerHeader;
