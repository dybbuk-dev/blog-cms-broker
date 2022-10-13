import { i18n } from 'src/i18n';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

function CompareRegion({ children, name }) {
  return (
    <TableRow>
      <TableCell colSpan={100}>
        <MDTypography
          variant="h3"
          color="text"
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
    </TableRow>
  );
}

CompareRegion.defaultProps = {
  children: null,
  name: null,
};

CompareRegion.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
};

export default CompareRegion;
