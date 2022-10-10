import {
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
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
        title="Meist gelesen"
        sx={{ pb: 1, px: 3, pt: 3 }}
      />
      <CardContent sx={{ pt: 0 }}>
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
      </CardContent>
    </Card>
  );
}

MostRead.propTypes = {};

export default MostRead;
