import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import ImageView from 'src/view/home/ImageView';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import OverallRating from 'src/view/home/broker/shared/OverallRating';
import SendIcon from '@mui/icons-material/Send';

function BrokerHeader({ record }) {
  const { sidenavColor } = selectMuiSettings();
  return (
    <MDBox>
      <MDTypography variant="h2">
        {record.name}
      </MDTypography>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <ImageView
          value={record.broker_image_broker_detail_logo}
        />
        <MDBox
          display="flex"
          flexDirection="column"
          gap={1}
        >
          <OverallRating record={record} />
          <MDButton
            variant="contained"
            href={record.meta?.homepage}
            color={sidenavColor}
            target="_blank"
            startIcon={<SendIcon />}
          >
            {i18n(
              'entities.broker.text.nowTo',
              record.name,
            )}
          </MDButton>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export default BrokerHeader;
