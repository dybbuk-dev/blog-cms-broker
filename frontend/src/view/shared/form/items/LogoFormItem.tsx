import { FormControl, FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import ImagesUploader from 'src/view/shared/uploaders/ImagesUploader';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function LogoFormItem(props) {
  const {
    externalErrorMessage,
    forceValue,
    hint,
    label,
    max,
    name,
    required,
    rerender,
    storage,
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

  const formValue = getValues(name);

  const getInitialValue = () =>
    formValue || value || defaultValues[name] || [];

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  if (forceValue) {
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    register({ name });
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

  const formHelperText = errorMessage || hint;

  return (
    <FormControl
      fullWidth
      required={required}
      error={Boolean(errorMessage)}
      component="fieldset"
      size="small"
    >
      <MDTypography
        variant="body2"
        fontWeight="regular"
        textAlign="center"
      >
        {label}
      </MDTypography>

      <ImagesUploader
        storage={storage}
        value={curValue}
        onChange={(newValue) => {
          setCurValue(newValue);
          setValue(name, newValue, {
            shouldValidate: false,
            shouldDirty: true,
          });
          props.onChange && props.onChange(newValue);
        }}
        max={max}
      />

      {formHelperText && (
        <FormHelperText
          sx={{ textAlign: 'center', fontWeight: 400 }}
        >
          {formHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

LogoFormItem.defaultProps = {
  forceValue: false,
  max: 1,
  required: false,
};

LogoFormItem.propTypes = {
  forceValue: PropTypes.bool,
  formItemProps: PropTypes.object,
  hint: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  storage: PropTypes.object.isRequired,
  value: PropTypes.array,
};

export default LogoFormItem;
