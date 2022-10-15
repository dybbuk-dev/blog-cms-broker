import { i18n } from '../../../i18n';
import Box from '@mui/material/Box';
import BrokerRatingPercent from './BrokerRatingPercent';
import PropTypes from 'prop-types';
import RatingViewItem from '../../shared/RatingViewItem';
import React from 'react';
import Typography from '@mui/material/Typography';

function OverallRating({
  record,
  hideDescription,
  hidePercent,
  size,
}) {
  return (
    <>
      <Box
        display="inline-flex"
        alignItems="center"
        flexWrap="wrap"
        gap={1}
      >
        {!hidePercent && (
          <BrokerRatingPercent
            value={record.rating?.overall_rating}
            size={size}
          />
        )}
        <RatingViewItem
          value={record.rating?.overall_rating}
          precision={0.1}
          emptyIcon={
            <img
              src="/images/star-grey.png"
              alt="star-grey"
              height={size}
            />
          }
          icon={
            <img
              src="/images/star-fill.png"
              alt="star-fill"
              height={size}
            />
          }
          size="large"
        />
      </Box>
      {!hideDescription && (
        <Typography
          variant="body2"
          fontSize={(size * 3) / 7}
          color="text"
          fontWeight="regular"
        >
          {i18n(
            'entities.broker.text.rating',
            record.rating?.overall_rating?.toFixed(2) ?? 0,
            5,
            record.rating?.overall_reviews ?? 0,
          )}
        </Typography>
      )}
    </>
  );
}

OverallRating.defaultProps = {
  hideDescription: false,
  hidePercent: false,
  size: 32,
};

OverallRating.propTypes = {
  record: PropTypes.any.isRequired,
  hideDescription: PropTypes.bool,
  hidePercent: PropTypes.bool,
  size: PropTypes.number,
};

export default OverallRating;
