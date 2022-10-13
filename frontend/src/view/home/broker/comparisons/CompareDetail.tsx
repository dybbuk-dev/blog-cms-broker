import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';

function CompareDetail({
  after,
  before,
  childrenA,
  childrenB,
}) {
  return (
    <TableCell width="75%">
      <Grid container>
        {Boolean(before) && (
          <Grid xs={12} item>
            {before}
          </Grid>
        )}
        <Grid xs={6} item>
          {childrenA}
        </Grid>
        <Grid xs={6} item>
          {childrenB}
        </Grid>
        {Boolean(after) && (
          <Grid xs={12} item>
            {after}
          </Grid>
        )}
      </Grid>
    </TableCell>
  );
}

CompareDetail.defaultProps = {
  after: null,
  before: null,
};

CompareDetail.propTypes = {
  after: PropTypes.any,
  before: PropTypes.any,
  childrenA: PropTypes.any.isRequired,
  childrenB: PropTypes.any.isRequired,
};

export default CompareDetail;
