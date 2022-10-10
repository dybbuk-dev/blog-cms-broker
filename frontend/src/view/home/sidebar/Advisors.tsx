import {
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MaterialLink from '@mui/material/Link';
import MDTypography from 'src/mui/components/MDTypography';

function Advisors({ record }) {
  const { sidenavColor } = selectMuiSettings();
  return (
    <Card>
      <CardHeader
        title="Ratgeber"
        sx={{ pb: 1, px: 3, pt: 3 }}
      />
      <CardContent sx={{ pt: 0 }}>
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
      </CardContent>
    </Card>
  );
}

Advisors.propTypes = {};

export default Advisors;
