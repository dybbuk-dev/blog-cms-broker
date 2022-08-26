import PropTypes from 'prop-types';
import Color from 'color';
import MDTypography from 'src/mui/components/MDTypography';

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
  const { color, label } = props;
  return (
    <MDTypography
      variant="caption"
      fontWeight="bold"
      backgroundColor={getColorBadgeBack(color)}
      px={1}
      py={0.75}
      borderRadius={1}
      textTransform="uppercase"
      letterSpacing={1}
      sx={{
        color: getColorBadgeFore(color),
      }}
    >
      {label}
    </MDTypography>
  );
}

ColorBadge.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ColorBadge;
