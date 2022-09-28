import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function AttrTypography({ children }) {
  return (
    <MDTypography
      variant="body2"
      fontWeight="regular"
      lineHeight="1.25"
      position="relative"
      my={1}
      pl={3}
    >
      {children}
    </MDTypography>
  );
}

AttrTypography.defaultProps = {
  children: null,
};

AttrTypography.propTypes = {
  children: PropTypes.any,
};

export default AttrTypography;
