import { Grid } from '@mui/material';
import { i18n } from '../../../i18n';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageView from '../../shared/ImageView';
import OverallRating from '../shared/OverallRating';
import React from 'react';
import Typography from '@mui/material/Typography';

function BrokerHeader({ record }) {
  return (
    <Box py={2}>
      <Typography variant="h2" mb={2}>
        {`${record.name} Erfahrungen und Test`}
      </Typography>
      <Grid spacing={3} alignItems="stretch" container>
        <Grid md={6} xs={12} item>
          <ImageView
            value={record.broker_image_broker_detail_logo}
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
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-end"
            gap={{ xs: 1, md: 1.5, lg: 2 }}
          >
            <OverallRating record={record} />
            <Button
              variant="contained"
              href={record.meta?.homepage}
              color="info"
              target="_blank"
              fullWidth
            >
              {i18n(
                'entities.broker.text.nowTo',
                record.name,
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BrokerHeader;
