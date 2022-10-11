import { Card, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import categorySidebarSelectors from 'src/modules/category/sidebar/categorySidebarSelectors';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Spinner from 'src/view/shared/Spinner';

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
      <CardHeader
        title="Broker-Kategorien"
        sx={{ pb: 1, px: 3, pt: 2 }}
      />
      <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
        {loading && <Spinner />}
        {!loading &&
          record?.count > 0 &&
          record?.rows.map((cat) => (
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
      </MDBox>
    </Card>
  );
}

Category.propTypes = {};

export default Category;
