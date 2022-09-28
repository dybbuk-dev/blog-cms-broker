import BrokerAttrs from 'src/view/home/broker/shared/BrokerAttrs';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MDBox from 'src/mui/components/MDBox';
import PropTypes from 'prop-types';

function BrokerCheckbox({ record, field }) {
  return (
    <MDBox
      lineHeight={0}
      position="relative"
      fontSize="20px"
    >
      <MDBox position="relative" my={1} pl={3}>
        <MDBox
          display="inline"
          position="absolute"
          left={0}
          top="0.1rem"
        >
          {record.checkbox[field.toLowerCase()] ===
          'PRO' ? (
            <CheckCircleIcon color="success" />
          ) : record.checkbox[field.toLowerCase()] ===
            'CONTRA' ? (
            <CancelIcon color="secondary" />
          ) : null}
        </MDBox>
        <BrokerAttrs
          records={
            record.checkbox[`text_${field.toLowerCase()}`]
          }
          attrs={{ link: 'url', title: 'text' }}
          noIndent
        />
      </MDBox>
    </MDBox>
  );
}

BrokerCheckbox.propTypes = {
  record: PropTypes.any.isRequired,
  field: PropTypes.string.isRequired,
};

export default BrokerCheckbox;
