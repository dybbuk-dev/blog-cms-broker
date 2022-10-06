import PropTypes from 'prop-types';
import MDBox from 'src/mui/components/MDBox';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function BrokerRatingPercent({ value }) {
  const percent = Number(((value / 5) * 100).toFixed(0));
  return (
    <MDBox
      display="flex"
      bgColor={percent >= 50 ? 'info' : 'error'}
      color="white"
      borderRadius="md"
      alignItems="center"
      fontWeight="bold"
      gap={1}
      px={1}
    >
      {percent >= 50 ? <ThumbUpIcon /> : <ThumbDownIcon />}
      {`${percent}%`}
    </MDBox>
  );
}

BrokerRatingPercent.defaultProps = {
  value: 0,
};

BrokerRatingPercent.propTypes = {
  value: PropTypes.number,
};

export default BrokerRatingPercent;
