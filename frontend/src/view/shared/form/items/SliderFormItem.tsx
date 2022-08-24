import { Slider } from '@mui/material';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';

function SliderFormItem(props) {
  const {
    name,
    label,
    marks,
    valuetext,
    step,
    defaultValue,
    ...rest
  } = props;

  const { setValue } = useFormContext();

  const [sliderValue, setSliderValue] = useState(
    rest.value,
  );

  const onChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    if (typeof newValue === 'number') {
      setSliderValue(newValue);
      setValue(name, marks[newValue].key, {
        shouldValidate: true,
        shouldDirty: true,
      });
      props.onChange && props.onChange(marks[newValue].key);
    }
  };

  return (
    <MDBox
      pt={1}
      sx={{
        position: 'relative',
      }}
    >
      <MDBox
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="text"
          mr={1}
        >
          {`${label}:`}
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular">
          {marks[sliderValue].label}
        </MDTypography>
      </MDBox>
      <Slider
        defaultValue={defaultValue}
        getAriaValueText={valuetext}
        step={step}
        valueLabelDisplay="off"
        {...rest}
        value={sliderValue}
        onChange={onChange}
      />
      <MDBox display="none">
        <InputFormItem name={name} label={label} />
      </MDBox>
    </MDBox>
  );
}

export default SliderFormItem;
