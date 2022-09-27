import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import StyledRating from 'src/view/shared/styles/StyledRating';

export function RatingFormItem(props) {
  const { darkMode } = selectMuiSettings();
  const {
    allowHalf,
    color,
    count,
    defaultValue,
    disabled,
    emptyIcon,
    externalErrorMessage,
    forceValue,
    icon,
    label,
    name,
    readOnly,
    required,
    rerender,
    size,
    value,
  } = props;

  const {
    control: { defaultValuesRef },
    errors,
    formState: { touched, isSubmitted },
    getValues,
    register,
    setValue,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = name ? getValues(name) : null;

  const getInitialValue = () =>
    formValue || value || defaultValues[name] || 0;

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  if (forceValue && name) {
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    if (name) {
      register({ name });
    }
  }, [register, name]);

  useEffect(() => {
    if (forceValue) {
      setCurValue(value);
    }
  }, [value]);

  useEffect(() => {
    setCurValue(getInitialValue());
  }, [rerender]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  return (
    <MDBox
      pt={Boolean(label) ? 2 : 0}
      position="relative"
      lineHeight={0}
    >
      {Boolean(label) && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          lineHeight={1}
          position="absolute"
          top="0"
        >
          {label}
        </MDTypography>
      )}
      <StyledRating
        name={name}
        defaultValue={defaultValue}
        value={curValue}
        icon={icon}
        emptyIcon={icon || emptyIcon}
        max={count}
        precision={allowHalf ? 0.5 : 1}
        onChange={(evt, newVal) => {
          if (!forceValue) {
            setValue(name, newVal, {
              shouldValidate: false,
              shouldDirty: true,
            });
          }
          setCurValue(newVal);
          props.onChange && props.onChange(newVal);
        }}
        ownerState={{
          color,
        }}
        disabled={disabled}
        readOnly={readOnly}
        size={size}
      />
      {errorMessage && (
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errorMessage}
          </MDTypography>
        </MDBox>
      )}
    </MDBox>
  );
}

RatingFormItem.defaultProps = {
  allowHalf: false,
  color: null,
  count: 5,
  defaultValue: 0,
  disabled: false,
  forceValue: false,
  readOnly: false,
  required: false,
  size: 'medium',
};

RatingFormItem.propTypes = {
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

export default RatingFormItem;