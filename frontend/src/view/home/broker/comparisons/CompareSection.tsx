import { i18n } from 'src/i18n';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';

function CompareSection({ children, name }) {
  return (
    <TableCell>
      <MDTypography
        variant="h6"
        color="warning"
        whiteSpace="nowrap"
        lineHeight="1.25"
        my={1}
      >
        {Boolean(children) && children}
        {!children &&
          Boolean(name) &&
          i18n(`entities.broker.comparison.${name}`)}
      </MDTypography>
    </TableCell>
  );
}

CompareSection.defaultProps = {
  children: null,
  name: null,
};

CompareSection.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
};

export default CompareSection;
