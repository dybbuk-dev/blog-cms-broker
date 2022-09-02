import { Card, Grid, IconButton } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function GroupInputFormItem(props) {
  const {
    GroupInput,
    fullWidth,
    index,
    label,
    name,
    required,
    value,
    variant,
    xl,
    lg,
    md,
    sm,
    xs,
    onChange,
    ...rest
  } = props;

  const onGroupInputChange = (...args) => {
    onChange &&
      onChange({
        name,
        index,
        args,
      });
  };

  return (
    <Grid xl={xl} lg={lg} md={md} sm={sm} xs={xs} item>
      <GroupInput
        fullWidth={fullWidth}
        label={label}
        name={`~${name}-${index}~`}
        required={required}
        value={value}
        variant={variant}
        onChange={onGroupInputChange}
        {...rest}
        unregister
      />
    </Grid>
  );
}

GroupInputFormItem.propTypes = {
  GroupInput: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.any,
  variant: PropTypes.string,
  xl: PropTypes.number,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
  onChange: PropTypes.func,
};

function GroupFormItem(props) {
  const { sidenavColor } = selectMuiSettings();

  const {
    groupInputTemplates,
    label,
    name: groupName,
    namePrefix,
    nameSuffix,
    valueAttr,
  } = props;

  const realGroupName = [namePrefix, groupName, nameSuffix]
    .filter(Boolean)
    .join('');

  const defaultValue = {};

  groupInputTemplates.forEach(
    ({ name, defaultValue: value }) => {
      defaultValue[name] = value ?? null;
    },
  );

  const {
    register,
    setValue,
    control: { defaultValuesRef },
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const valueContainer = valueAttr
    ? defaultValues[valueAttr]
    : null;

  const originalValue =
    defaultValues[realGroupName] ||
    (valueContainer && valueContainer[groupName]) ||
    [];

  const [curValue, setCurValue] = useState(originalValue);

  const updateGroupValue = (newValue) => {
    setValue(realGroupName, newValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setCurValue(newValue);
  };

  useEffect(() => {
    register({ name: realGroupName });
    updateGroupValue(originalValue);
  }, [register, realGroupName]);

  const addNewGroupValue = (index) => {
    updateGroupValue([
      ...curValue.slice(0, index + 1),
      defaultValue,
      ...curValue.slice(index + 1),
    ]);
  };

  const moveUpGroupValue = (index) => {
    if (index <= 0) {
      return;
    }
    updateGroupValue([
      ...curValue.slice(0, index - 1),
      ...curValue.slice(index, index + 1),
      ...curValue.slice(index - 1, index),
      ...curValue.slice(index + 1),
    ]);
  };

  const moveDownGroupValue = (index) => {
    if (index >= curValue.length - 1) {
      return;
    }
    updateGroupValue([
      ...curValue.slice(0, index),
      ...curValue.slice(index + 1, index + 2),
      ...curValue.slice(index, index + 1),
      ...curValue.slice(index + 2),
    ]);
  };

  const clearGroupValue = (index) => {
    updateGroupValue([
      ...curValue.slice(0, index),
      ...curValue.slice(index + 1),
    ]);
  };

  const onChange = ({ name, index, args }) => {
    if (!args || args.length === 0) {
      return;
    }
    const newValue = [...curValue];
    newValue[index][name] = args[0];
    updateGroupValue(newValue);
  };

  return (
    <>
      <Card>
        <MDBox p={3}>
          <Grid spacing={2} container>
            <Grid xs={12} item>
              <MDBox
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <MDBox mr={2} whiteSpace="nowrap">
                  <IconButton
                    color={sidenavColor}
                    onClick={() => {
                      addNewGroupValue(-1);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </MDBox>
                {label && (
                  <MDTypography
                    variant="h6"
                    color="text"
                    textTransform="capitalize"
                  >
                    {label}
                  </MDTypography>
                )}
              </MDBox>
            </Grid>
            {curValue.map((val, idx, ary) => (
              <Grid key={`group-row-${idx}`} xs={12} item>
                <MDBox
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <MDBox mr={2} whiteSpace="nowrap">
                    <IconButton
                      color={sidenavColor}
                      onClick={() => {
                        addNewGroupValue(idx);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      color={sidenavColor}
                      onClick={() => {
                        moveUpGroupValue(idx);
                      }}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton
                      color={sidenavColor}
                      onClick={() => {
                        moveDownGroupValue(idx);
                      }}
                    >
                      <ArrowDownwardIcon />
                    </IconButton>
                    <IconButton
                      color={sidenavColor}
                      onClick={() => {
                        clearGroupValue(idx);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </MDBox>
                  <MDBox mr={2}>
                    <MDTypography
                      variant="button"
                      color="text"
                      fontWeight="regular"
                    >
                      {idx + 1}.
                    </MDTypography>
                  </MDBox>
                  <MDBox width="100%">
                    <Grid spacing={2} container>
                      {groupInputTemplates.map(
                        ({
                          input,
                          fullWidth,
                          label,
                          name,
                          required,
                          variant,
                          xl,
                          lg,
                          md,
                          sm,
                          xs,
                          ...rest
                        }) => (
                          <GroupInputFormItem
                            key={`${idx}-${name}`}
                            GroupInput={input}
                            fullWidth={fullWidth}
                            index={idx}
                            label={label}
                            name={name}
                            required={required}
                            value={val[name]}
                            variant={variant || 'standard'}
                            xl={xl}
                            lg={lg}
                            md={md}
                            sm={sm}
                            xs={xs}
                            onChange={onChange}
                            {...rest}
                          />
                        ),
                      )}
                    </Grid>
                  </MDBox>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Card>
    </>
  );
}

GroupFormItem.defaultProps = {
  groupInputTemplates: [],
};

GroupFormItem.propTypes = {
  groupInputTemplates: PropTypes.array.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  namePrefix: PropTypes.string,
  nameSuffix: PropTypes.string,
  valueAttr: PropTypes.string,
};

export default GroupFormItem;
