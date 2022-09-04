import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'src/view/shared/form/formErrors';
import {
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function SwitchFormItem(props) {
  const { sidenavColor } = selectMuiSettings();

  const {
    label,
    name,
    hint,
    required,
    externalErrorMessage,
  } = props;

  const {
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    control: { defaultValuesRef },
    getValues,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = getValues(name);

  const [checked, setChecked] = useState(() => {
    if (formValue !== undefined && formValue !== null) {
      return formValue;
    }
    if (props.value !== undefined && props.value !== null) {
      return props.value;
    }
    if (
      defaultValues[name] !== undefined &&
      defaultValues[name] !== null
    ) {
      return defaultValues[name];
    }
    return false;
  });

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
    <>
      <FormControlLabel
        control={
          <Switch
            id={name}
            name={name}
            checked={
              props.forceValue ? props.value : checked
            }
            onChange={(e) => {
              setChecked(Boolean(e.target.checked));
              setValue(name, Boolean(e.target.checked), {
                shouldValidate: false,
                shouldDirty: true,
              });
              props.onChange &&
                props.onChange(e.target.checked);
            }}
            onBlur={() =>
              props.onBlur && props.onBlur(null)
            }
            // inputRef={register}
            color={sidenavColor}
          />
        }
        label={label}
      />
      {formHelperText && (
        <FormHelperText style={{ marginTop: 0 }}>
          {formHelperText}
        </FormHelperText>
      )}
    </>
  );
}

SwitchFormItem.defaultProps = {};

SwitchFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  label: PropTypes.string,
  hint: PropTypes.string,
  externalErrorMessage: PropTypes.string,
};

export default SwitchFormItem;
