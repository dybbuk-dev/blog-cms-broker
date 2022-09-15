import { FormControl, FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FilesUploader from 'src/view/shared/uploaders/FilesUploader';
import FormErrors from 'src/view/shared/form/formErrors';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function FilesFormItem(props) {
  const {
    label,
    name,
    hint,
    storage,
    formats,
    max,
    required,
    externalErrorMessage,
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

  const [curValue, setCurValue] = useState(
    formValue || defaultValues[name] || [],
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
    <FormControl
      fullWidth
      required={required}
      error={Boolean(errorMessage)}
      component="fieldset"
      size="small"
    >
      <MDTypography
        variant="caption"
        fontWeight="regular"
        mb={0.8}
      >
        {label}
      </MDTypography>

      <FilesUploader
        storage={storage}
        formats={formats || storage.formats}
        value={curValue}
        onChange={(value) => {
          setCurValue(value);
          setValue(name, value, {
            shouldValidate: false,
            shouldDirty: true,
          });
          props.onChange && props.onChange(value);
        }}
        max={max}
      />

      {formHelperText && (
        <FormHelperText style={{ marginTop: 0 }}>
          {formHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

FilesFormItem.defaultProps = {
  max: undefined,
  required: false,
};

FilesFormItem.propTypes = {
  formats: PropTypes.any,
  formItemProps: PropTypes.object,
  hint: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  storage: PropTypes.object.isRequired,
};

export default FilesFormItem;
