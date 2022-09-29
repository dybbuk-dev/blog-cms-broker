import {
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
import MDTypography from 'src/mui/components/MDTypography';
import Spinner from 'src/view/shared/Spinner';
import categorySidebarSelectors from 'src/modules/category/sidebar/categorySidebarSelectors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function Category() {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    categorySidebarSelectors.selectLoading,
  );
  const record = useSelector(
    categorySidebarSelectors.selectRecord,
  );
  return (
    <Card>
      <CardHeader title="Broker-Kategorien" />
      <CardContent>
        {loading && <Spinner />}
        {!loading &&
          record.count > 0 &&
          record.rows.map((cat) => (
            <MDTypography
              key={cat.id}
              variant="body2"
              color={sidenavColor}
              fontWeight="regular"
            >
              <MaterialLink
                component={Link}
                to={cat.link}
                underline="hover"
              >
                {cat.name}
              </MaterialLink>
            </MDTypography>
          ))}
      </CardContent>
    </Card>
  );
}

Category.propTypes = {};

export default Category;
