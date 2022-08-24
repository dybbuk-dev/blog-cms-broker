import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Color from 'color';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ColorScoreFormItem(props) {
  const { darkMode } = selectMuiSettings();
  const { name, label, value, valueLabel, color } = props;
  return (
    <MDBox
      pt={2}
      sx={{
        position: 'relative',
      }}
    >
      <MDTypography
        variant="caption"
        color={darkMode ? 'text' : 'secondary'}
        fontWeight="regular"
        sx={{
          lineHeight: 1,
          position: 'absolute',
          top: 0,
        }}
      >
        {label}
      </MDTypography>
      <MDTypography
        variant="button"
        fontWeight="regular"
        textTransform="capitalize"
        color={Color(color).isDark() ? 'white' : 'black'}
        backgroundColor={color ?? 'transparent'}
        px={2}
        py={0.5}
        borderRadius={1}
      >
        {valueLabel ?? value}
      </MDTypography>
      <MDBox display="none">
        <InputFormItem name={name} value={value} />
      </MDBox>
    </MDBox>
  );
}

export default ColorScoreFormItem;
