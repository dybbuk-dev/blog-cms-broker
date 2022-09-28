import AddCircleIcon from '@mui/icons-material/AddCircle';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function BrokerUpsides({ record }) {
  return (record.upsides || []).map((upside) => (
    <MDBox
      key={upside.id}
      position="relative"
      my={1}
      pl={3}
    >
      <MDBox
        display="inline"
        position="absolute"
        left={0}
        top={0}
      >
        {upside.type === 'UPSIDE' ? (
          <AddCircleIcon color="success" />
        ) : (
          <RemoveCircleIcon color="secondary" />
        )}
      </MDBox>
      <MDTypography
        variant="body1"
        fontWeight="regular"
        lineHeight="1.25"
      >
        {upside.text}
      </MDTypography>
    </MDBox>
  ));
}

BrokerUpsides.propTypes = {
  record: PropTypes.any.isRequired,
};

export default BrokerUpsides;
