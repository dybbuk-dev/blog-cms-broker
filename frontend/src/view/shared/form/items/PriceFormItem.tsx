import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PropTypes from 'prop-types';
import RatingFormItem from 'src/view/shared/form/items/RatingFormItem';

function PriceFormItem(props) {
  const { color } = props;

  const { sidenavColor } = selectMuiSettings();

  return (
    <RatingFormItem
      {...props}
      color={color || sidenavColor}
    />
  );
}

PriceFormItem.defaultProps = {
  color: null,
  count: 4,
  icon: <AttachMoneyIcon />,
  precision: 0,
  showValue: false,
  size: 'medium',
};

PriceFormItem.propTypes = {
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
  precision: PropTypes.number,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  showValue: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

export default PriceFormItem;
