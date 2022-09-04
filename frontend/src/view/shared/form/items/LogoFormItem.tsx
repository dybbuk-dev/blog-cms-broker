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
    label,
    name,
    hint,
    storage,
    max,
    required,
    externalErrorMessage,
    value,
  } = props;

  const {
    errors,
    formState: { touched, isSubmitted },
    setValue,
    control: { defaultValuesRef },
    getValues,
    register,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = getValues(name);

  const [curValue, setCurValue] = useState(
    formValue || value || defaultValues[name] || '',
  );

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const formHelperText = errorMessage || hint;

  return (
    <MDBox textAlign="center" my={3}>
      <FormControl
        fullWidth
        required={required}
        error={Boolean(errorMessage)}
        component="fieldset"
        size="small"
      >
        <ImagesUploader
          storage={storage}
          value={
            props.forceValue ? value : formValue || curValue
          }
          onChange={(newValue) => {
            setValue(name, newValue, {
              shouldValidate: false,
              shouldDirty: true,
            });
            setCurValue(newValue);
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
        <MDBox textAlign="center" px={3}>
          <MDTypography variant="h5" fontWeight="regular">
            {label}
          </MDTypography>
        </MDBox>
      </FormControl>
    </MDBox>
  );
}

LogoFormItem.defaultProps = {
  max: 1,
  required: false,
};

LogoFormItem.propTypes = {
  storage: PropTypes.object.isRequired,
  max: PropTypes.number,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  formItemProps: PropTypes.object,
  value: PropTypes.any,
};

export default LogoFormItem;
