import { Card, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function Advisors({ record }) {
  const { sidenavColor } = selectMuiSettings();
  return (
    <Card>
      <CardHeader
        title="Ratgeber"
        sx={{ pb: 1, px: 3, pt: 2 }}
      />
      <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
        {record.blogs.map((row, idx) => (
          <MDTypography
            key={idx}
            variant="body2"
            fontWeight="regular"
            color={sidenavColor}
          >
            <MaterialLink
              component={Link}
              to={`/blog/${row.name_normalized}`}
              underline="hover"
            >
              {row.name}
            </MaterialLink>
          </MDTypography>
        ))}
        {record.articles.map((row, idx) => (
          <MDTypography
            key={idx}
            variant="body2"
            fontWeight="regular"
            color={sidenavColor}
          >
            <MaterialLink
              component={Link}
              to={`/${record.name_normalized}/${row.name_normalized}`}
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

Advisors.propTypes = {};

export default Advisors;
