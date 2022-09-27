import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PropTypes from 'prop-types';
import RatingRangeFormItem from 'src/view/shared/form/items/RatingRangeFormItem';

function PriceRangeFormItem(props) {
  const { color } = props;

  const { sidenavColor } = selectMuiSettings();

  return (
    <RatingRangeFormItem
      {...props}
      color={color || sidenavColor}
    />
  );
}

PriceRangeFormItem.defaultProps = {
  color: null,
  count: 4,
  icon: <AttachMoneyIcon />,
  size: 'medium',
};

PriceRangeFormItem.propTypes = {
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
  disabled: PropTypes.bool,
  emptyIcon: PropTypes.any,
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  icon: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

export default PriceRangeFormItem;
