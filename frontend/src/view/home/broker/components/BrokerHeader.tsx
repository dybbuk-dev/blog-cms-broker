import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import BrokerRatingPercent from 'src/view/home/broker/BrokerRatingPercent';
import ImageView from 'src/view/home/ImageView';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import RatingViewItem from 'src/view/shared/view/RatingViewItem';
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
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={1}
          >
            <BrokerRatingPercent
              value={record.rating?.overall_rating}
            />
            <RatingViewItem
              value={record.rating?.overall_rating}
              precision={0.1}
              size="large"
            />
          </MDBox>
          <MDTypography
            variant="body2"
            color="text"
            fontWeight="regular"
          >
            {i18n(
              'entities.broker.text.rating',
              record.rating?.overall_rating?.toFixed(2),
              5,
              record.rating?.overall_reviews,
            )}
          </MDTypography>
          <MDButton
            variant="contained"
            href={record.meta?.homepage}
            color={sidenavColor}
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
