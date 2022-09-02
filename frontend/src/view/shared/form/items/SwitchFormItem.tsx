import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'src/view/shared/form/formErrors';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
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
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const [checked, setChecked] = useState(
    props.value === undefined || props.value === null
      ? defaultValues[name] || false
      : props.value,
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
