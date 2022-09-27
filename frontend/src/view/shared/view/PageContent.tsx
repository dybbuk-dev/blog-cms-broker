import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';

function PageContent({ children }) {
  return (
    <Card>
      <MDBox p={5} color="text">
        {children}
      </MDBox>
    </Card>
  );
}

export default PageContent;
