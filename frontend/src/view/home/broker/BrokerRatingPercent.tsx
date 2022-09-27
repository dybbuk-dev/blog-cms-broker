import PropTypes from 'prop-types';
import MDBox from 'src/mui/components/MDBox';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function BrokerRatingPercent(props) {
  const { value } = props;
  const percent = Number(((value / 5) * 100).toFixed(0));
  return (
    <MDBox
      display="flex"
      bgColor={percent >= 50 ? 'success' : 'error'}
      color="white"
      borderRadius="md"
      gap={1}
      alignItems="center"
      px={1}
    >
      {percent >= 50 ? <ThumbUpIcon /> : <ThumbDownIcon />}
      {`${percent}%`}
    </MDBox>
  );
}

export default BrokerRatingPercent;
