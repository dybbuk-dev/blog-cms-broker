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
import { useEffect, useState } from 'react';

function BrokerHeader({ record }) {
  const { darkMode } = selectMuiSettings();
  const colors = darkMode ? dColors : lColors;
  const [ratingSize, setRatingSize] = useState(37);
  useEffect(() => {
    const handleRatingSize = () => {
      if (window.innerWidth > 1400) {
        setRatingSize(50);
      } else if (window.innerWidth > 1200) {
        setRatingSize(42);
      } else if (window.innerWidth > 1000) {
        setRatingSize(28);
      } else if (window.innerWidth > 700) {
        setRatingSize(50);
      } else if (window.innerWidth > 600) {
        setRatingSize(48);
      } else {
        setRatingSize(37);
      }
    };
    window.addEventListener('resize', handleRatingSize);
    handleRatingSize();
    return () =>
      window.removeEventListener(
        'resize',
        handleRatingSize,
      );
  }, []);
  return (
    <MDBox
      py={2}
      borderTop={`1px dashed ${colors.inputBorderColor}`}
      borderBottom={`1px dashed ${colors.inputBorderColor}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: record.name,
            brand: record.name,
            logo: record.broker_image_broker_detail_logo[0]
              .downloadUrl,
            image:
              record.broker_image_broker_detail_logo[0]
                .downloadUrl,
            review: {
              '@type': 'Review',
              reviewBody: record.meta?.teaser || '',
              author: 'Paul Steward',
            },
            sku: record.name_normalized,
            offers: { '@type': 'Demand' },
            description:
              record.meta?.teaser ||
              `Erfahrungen von ${record.name}`,
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: Number(
                record.rating?.overall_rating || 0,
              ).toFixed(2),
              worstRating: 1,
              bestRating: 5,
              ratingCount: record.rating?.overall_reviews,
            },
          }),
        }}
      />
      <MDTypography variant="h1" mb={2}>
        {`${record.name} Erfahrungen und Test`}
      </MDTypography>
      <Grid spacing={3} alignItems="stretch" container>
        <Grid lg={6} xs={12} item>
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
        <Grid lg={6} xs={12} item>
          <MDBox
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-end"
            gap={{ xs: 1, lg: 0.6, xl: 0.6 }}
          >
            <OverallRating
              record={record}
              size={ratingSize}
            />
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
