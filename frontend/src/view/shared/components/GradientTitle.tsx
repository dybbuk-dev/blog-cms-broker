import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function GradientTitle(props) {
  const { sidenavColor } = selectMuiSettings();
  const { children } = props;
  return (
    <>
      <MDBox
        variant="gradient"
        bgColor={sidenavColor}
        borderRadius="lg"
        coloredShadow={sidenavColor}
        position="absolute"
        left="0.8rem"
        right="0.8rem"
        top="-0.8rem"
        zIndex={2}
        py={1.6}
      >
        <MDTypography
          variant="h3"
          color="white"
          textAlign="center"
        >
          {children}
        </MDTypography>
      </MDBox>
      <MDBox mb={4.8}></MDBox>
    </>
  );
}

GradientTitle.propTypes = {
  children: PropTypes.any,
};

export default GradientTitle;
