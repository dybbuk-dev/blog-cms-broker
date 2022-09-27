import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PropTypes from 'prop-types';
import RatingViewItem from 'src/view/shared/view/RatingViewItem';

function PriceViewItem(props) {
  const { color } = props;

  const { sidenavColor } = selectMuiSettings();

  return (
    <RatingViewItem
      {...props}
      color={color || sidenavColor}
    />
  );
}

PriceViewItem.defaultProps = {
  color: null,
  count: 4,
  icon: <AttachMoneyIcon />,
  size: 'medium',
};

PriceViewItem.propTypes = {
  allowHalf: PropTypes.bool,
  color: PropTypes.oneOf([
    null,
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
  count: PropTypes.number,
  defaultValue: PropTypes.number,
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

export default PriceViewItem;
