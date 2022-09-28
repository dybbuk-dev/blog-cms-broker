import { i18n } from 'src/i18n';
import Icon from '@mui/material/Icon';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';

function CompareSection({ children, name, tooltip }) {
  return (
    <TableCell>
      <MDTypography
        variant="h5"
        color="warning"
        whiteSpace="nowrap"
        lineHeight="1.25"
        my={1}
      >
        {Boolean(children) && children}
        {!children &&
          Boolean(name) &&
          i18n(`entities.broker.comparison.${name}`)}
        {Boolean(tooltip) && (
          <Tooltip
            title={i18n(
              `entities.broker.comparison.${tooltip}`,
            )}
          >
            <Icon color="secondary">help</Icon>
          </Tooltip>
        )}
      </MDTypography>
    </TableCell>
  );
}

CompareSection.defaultProps = {
  children: null,
  name: null,
  tooltip: null,
};

CompareSection.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
  tooltip: PropTypes.string,
};

export default CompareSection;
