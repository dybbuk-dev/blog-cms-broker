import { Autocomplete } from '@mui/material';
import { i18n } from 'src/i18n';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function SelectFormItem(props) {
  const {
    label,
    name,
    hint,
    renderOption,
    renderInput,
    renderTags,
    options,
    required,
    mode,
    placeholder,
    isClearable,
    externalErrorMessage,
    size,
    shrink,
    margin,
    variant,
    value: defaultValue,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    control: { defaultValuesRef },
    getValues,
  } = useFormContext();

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const defaultValues = defaultValuesRef.current || {};

  const originalValue = defaultValues[name];

  const formValue = getValues(name);

  const [curValue, setCurValue] = useState(
    formValue || defaultValue || originalValue,
  );

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const value = () => {
    const { mode } = props;
    const realValue = props.forceValue
      ? defaultValue
      : formValue || curValue;
    if (mode === 'multiple') {
      return valueMultiple(realValue);
    } else {
      return valueOne(realValue);
    }
  };

  const valueMultiple = (values) => {
    if (values) {
      return values.map((value) =>
        options.find((option) => option.value === value),
      );
    }

    return [];
  };

  const valueOne = (value) => {
    const { options } = props;

    if (value != null) {
      return (
        options.find((option) => option.value === value) ||
        null
      );
    }

    return null;
  };

  const handleSelect = (data) => {
    const { mode } = props;
    if (mode === 'multiple') {
      return handleSelectMultiple(data);
    } else {
      return handleSelectOne(data);
    }
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      setCurValue([]);
      setValue(name, [], {
        shouldValidate: false,
        shouldDirty: true,
      });
      props.onChange && props.onChange([]);
      return;
    }

    const newValue = values
      .map((data) => (data ? data.value : data))
      .filter((value) => value != null);

    setCurValue(newValue);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectOne = (data) => {
    if (!data) {
      setCurValue(null);
      setValue(name, null, {
        shouldValidate: false,
        shouldDirty: true,
      });
      props.onChange && props.onChange(null);
      return;
    }

    setCurValue(data.value);
    setValue(name, data.value, {
      shouldValidate: false,
      shouldDirty: true,
    });
    props.onChange && props.onChange(data.value);
  };

  const defaultRenderInput = (params) => (
    <MDInput
      {...params}
      required={required}
      margin={margin}
      variant={variant}
      size={size}
      InputLabelProps={{
        shrink: shrink,
      }}
      label={label}
    />
  );

  return (
    <MDBox position="relative">
      <Autocomplete
        multiple={mode === 'multiple'}
        isOptionEqualToValue={(option, value) =>
          option.value === value.value
        }
        disablePortal={false}
        value={value()}
        options={options}
        onChange={(event: any, newValue: any) => {
          handleSelect(newValue);
        }}
        renderOption={renderOption}
        renderInput={renderInput ?? defaultRenderInput}
        renderTags={renderTags}
        loadingText={i18n('autocomplete.loading')}
        noOptionsText={i18n('autocomplete.noOptions')}
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

SelectFormItem.defaultProps = {
  required: false,
  isClearable: true,
};

SelectFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  externalErrorMessage: PropTypes.string,
  mode: PropTypes.string,
  isClearable: PropTypes.bool,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  shrink: PropTypes.bool,
  margin: PropTypes.string,
  renderOption: PropTypes.func,
  renderInput: PropTypes.func,
  renderTags: PropTypes.func,
  value: PropTypes.any,
};

export default SelectFormItem;
