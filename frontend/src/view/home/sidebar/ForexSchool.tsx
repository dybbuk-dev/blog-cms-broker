import { Card, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import navigationForexSchoolSelectors from 'src/modules/navigation/forexSchool/navigationForexSchoolSelectors';
import Spinner from 'src/view/shared/Spinner';

function ForexSchool() {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    navigationForexSchoolSelectors.selectLoading,
  );
  const record = useSelector(
    navigationForexSchoolSelectors.selectNavigation,
  );
  return (
    <Card>
      <CardHeader
        title="Forex-Schule"
        sx={{ pb: 1, px: 3, pt: 2 }}
      />
      <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
        {loading && <Spinner />}
        {!loading &&
          record.count > 0 &&
          record.rows.map((row) => (
            <MDTypography
              key={row.id}
              variant="body2"
              color={sidenavColor}
              fontWeight="regular"
            >
              <MaterialLink
                component={Link}
                to={row.link}
                underline="hover"
              >
                {row.name}
              </MaterialLink>
            </MDTypography>
          ))}
      </MDBox>
    </Card>
  );
}

ForexSchool.propTypes = {};

export default ForexSchool;
