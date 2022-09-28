import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';

function PageContent({ children, ...rest }) {
  return (
    <Card>
      <MDBox p={5} color="text" {...rest}>
        {children}
      </MDBox>
    </Card>
  );
}

export default PageContent;
