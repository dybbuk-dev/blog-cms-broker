import { i18n } from 'src/i18n';
import Icon from '@mui/material/Icon';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import Tooltip from '@mui/material/Tooltip';
import LazyLoad from 'react-lazy-load';

function CompareSection({ children, name, tooltip }) {
  return (
    <TableCell width="25%">
      <LazyLoad>
        <MDTypography
          variant="body1"
          color="warning"
          fontWeight="bold"
          lineHeight="1.25"
          my={1}
        >
          {Boolean(children) && children}
          {!children &&
            Boolean(name) &&
            i18n(`entities.broker.comparison.${name}`)}
          {Boolean(tooltip) && (
            <Tooltip
              title={
                typeof tooltip === 'string'
                  ? i18n(
                      `entities.broker.comparison.${tooltip}`,
                    )
                  : tooltip
              }
            >
              <Icon color="secondary">help</Icon>
            </Tooltip>
          )}
        </MDTypography>
      </LazyLoad>
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
  tooltip: PropTypes.any,
};

export default CompareSection;
