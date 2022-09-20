import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Color from 'color';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import lightColors from 'src/mui/assets/theme/base/colors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

export function getColorBadgeFore(color) {
  if (!color) {
    return null;
  }
  return Color(color).mix(Color('black'), 0.3).hex();
}

export function getColorBadgeBack(color) {
  if (!color) {
    return null;
  }
  return Color(color).mix(Color('white'), 0.75).hex();
}

function ColorBadge(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const defaultColor = darkMode
    ? darkColors[sidenavColor]?.main
    : lightColors[sidenavColor]?.main;
  const { color, label } = props;
  return (
    <MDBox lineHeight={1}>
      <MDTypography
        display="inline-block"
        variant="caption"
        backgroundColor={getColorBadgeBack(
          color || defaultColor,
        )}
        px={1}
        py={0.75}
        fontWeight="bold"
        borderRadius={1}
        m={0}
        textTransform="uppercase"
        letterSpacing={1}
        sx={{
          color: getColorBadgeFore(color || defaultColor),
        }}
      >
        {label}
      </MDTypography>
    </MDBox>
  );
}

ColorBadge.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default ColorBadge;
