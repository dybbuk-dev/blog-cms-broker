import { Card, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import navigationMostReadSelectors from 'src/modules/navigation/mostRead/navigationMostReadSelectors';
import Spinner from 'src/view/shared/Spinner';

function MostRead() {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    navigationMostReadSelectors.selectLoading,
  );
  const record = useSelector(
    navigationMostReadSelectors.selectNavigation,
  );
  return (
    <Card>
      <CardHeader
        title={
          <MDTypography
            variant="body1"
            fontWeight="bold"
            lineHeight={1.35}
          >
            Meist gelesen
          </MDTypography>
        }
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

MostRead.propTypes = {};

export default MostRead;
