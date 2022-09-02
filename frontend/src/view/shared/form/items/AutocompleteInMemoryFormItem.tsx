import _uniqBy from 'lodash/uniqBy';
import { Autocomplete } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDInput from 'src/mui/components/MDInput';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function AutocompleteInMemoryFormItem(props) {
  const { sidenavColor } = selectMuiSettings();

  const {
    label,
    name,
    hint,
    placeholder,
    autoFocus,
    externalErrorMessage,
    mode,
    required,
    isClearable,
    mapper,
    fetchFn,
    margin,
    shrink,
    size,
    variant,
    fullWidth,
    renderOption,
    renderInput,
  } = props;

  const {
    errors,
    control: { defaultValuesRef },
    setValue,
    register,
    formState: { touched, isSubmitted },
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const originalValue = defaultValues[name];

  const [fullDataSource, setFullDataSource] = useState<
    Array<any>
  >([]);
  const [loading, setLoading] = useState(false);

  const [realValue, setRealValue] = useState(originalValue);

  useEffect(() => {
    register({ name });
    handleSelect(value());
  }, [register, name]);

  useEffect(() => {
    const fetchAllResults = async () => {
      setLoading(true);

      try {
        let fullDataSource = await fetchFn();

        fullDataSource = fullDataSource.map((data) =>
          mapper.toAutocomplete(data),
        );

        setFullDataSource(fullDataSource);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setFullDataSource([]);
        setLoading(false);
        return [];
      }
    };

    fetchAllResults().then(() => {});
    // eslint-disable-next-line
  }, []);

  const prioritizeFromDataSource = (selected) => {
    return (
      (fullDataSource || []).find(
        (item) => item.value === selected.value,
      ) || selected
    );
  };

  const value = () => {
    if (mode === 'multiple') {
      return valueMultiple();
    } else {
      return valueOne();
    }
  };

  const valueMultiple = () => {
    if (realValue) {
      return realValue.map((value) =>
        prioritizeFromDataSource(
          mapper.toAutocomplete(value),
        ),
      );
    }

    return [];
  };

  const valueOne = () => {
    if (realValue) {
      return prioritizeFromDataSource(
        mapper.toAutocomplete(realValue),
      );
    }

    return null;
  };

  const handleSelect = (value) => {
    if (mode === 'multiple') {
      return handleSelectMultiple(value);
    } else {
      return handleSelectOne(value);
    }
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      setRealValue([]);
      setValue(name, [], {
        shouldValidate: false,
        shouldDirty: true,
      });
      props.onChange && props.onChange([]);
      return;
    }

    const newValue = values.map((value) =>
      mapper.toValue(value),
    );
    setRealValue(newValue);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectOne = (value) => {
    if (!value) {
      setRealValue(null);
      setValue(name, null, {
        shouldValidate: false,
        shouldDirty: true,
      });
      props.onChange && props.onChange(null);
      return;
    }

    const newValue = mapper.toValue(value);
    setRealValue(newValue);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const options = () => {
    const { mode } = props;

    if (!fullDataSource) {
      return [];
    }

    // Includes the selected value on the options
    if (value()) {
      if (mode === 'multiple') {
        return _uniqBy(
          [...fullDataSource, ...value()],
          'value',
        );
      } else {
        return _uniqBy(
          [...fullDataSource, value()],
          'value',
        );
      }
    }

    return fullDataSource;
  };

  const hintOrLoading = loading
    ? i18n('autocomplete.loading')
    : hint;

  const fnRenderInput = renderInput
    ? renderInput
    : (params) => (
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
          autoFocus={autoFocus || undefined}
        />
      );

  useEffect(() => {
    if (props.onChange) {
      props.onChange(
        prioritizeFromDataSource(value() ?? {}),
      );
    }
  }, [fullDataSource]);

  return (
    <>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Autocomplete
          multiple={mode === 'multiple'}
          isOptionEqualToValue={(option, value) => {
            return option.value === value.value;
          }}
          disablePortal={mode !== 'multiple'}
          value={value()}
          options={options()}
          onChange={(event: any, newValue: any) => {
            handleSelect(newValue);
          }}
          getOptionLabel={(option) => option.label ?? ''}
          renderOption={renderOption}
          renderInput={fnRenderInput}
          loadingText={i18n('autocomplete.loading')}
          noOptionsText={i18n('autocomplete.noOptions')}
          onBlur={() => props.onBlur && props.onBlur(null)}
          fullWidth={fullWidth}
        />

        {props.showCreate && props.hasPermissionToCreate ? (
          <MDButton
            variant="contained"
            color={sidenavColor}
            onClick={props.onOpenModal}
            size="small"
            sx={{
              marginLeft: '16px',
              marginTop: '16px',
              marginBottom: '8px',
              flexShrink: 0,
            }}
            circular
            iconOnly
          >
            <AddIcon />
          </MDButton>
        ) : null}
      </MDBox>
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
    </>
  );
}

AutocompleteInMemoryFormItem.defaultProps = {
  isClearable: true,
  mode: 'default',
  required: false,
};

AutocompleteInMemoryFormItem.propTypes = {
  fetchFn: PropTypes.func.isRequired,
  mapper: PropTypes.object.isRequired,
  required: PropTypes.bool,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  externalErrorMessage: PropTypes.string,
  isClearable: PropTypes.bool,
  showCreate: PropTypes.bool,
  hasPermissionToCreate: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
  shrink: PropTypes.bool,
  margin: PropTypes.string,
  fullWidth: PropTypes.bool,
  renderOption: PropTypes.func,
  renderInput: PropTypes.func,
};

export default AutocompleteInMemoryFormItem;
