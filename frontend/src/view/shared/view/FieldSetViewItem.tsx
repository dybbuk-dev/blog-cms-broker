import { Card, Grid } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function FieldSetViewItem(props) {
  const { children, description, label } = props;
  return (
    <Card>
      <MDBox p={3}>
        <Grid spacing={2} container>
          {(label || description) && (
            <Grid item xs={12}>
              <MDBox
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
              >
                <MDTypography
                  variant="h6"
                  color="text"
                  textTransform="capitalize"
                  mr={2}
                >
                  {label}
                </MDTypography>
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="regular"
                >
                  {description}
                </MDTypography>
              </MDBox>
            </Grid>
          )}
          <Grid item xs={12}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

FieldSetViewItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  description: PropTypes.string,
};

export default FieldSetViewItem;
