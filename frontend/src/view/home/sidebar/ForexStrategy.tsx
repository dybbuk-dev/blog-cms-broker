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
import navigationForexStrategySelectors from 'src/modules/navigation/forexStrategy/navigationForexStrategySelectors';
import Spinner from 'src/view/shared/Spinner';

function ForexStrategy() {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    navigationForexStrategySelectors.selectLoading,
  );
  const record = useSelector(
    navigationForexStrategySelectors.selectNavigation,
  );
  return (
    <Card>
      <CardHeader title="Forex-Strategien" />
      <CardContent>
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

ForexStrategy.propTypes = {};

export default ForexStrategy;
