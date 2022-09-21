import React from 'react';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';

function FirstPage(props) {
  return (
    <>
      <Card>
        <MDBox pt={3} px={3}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            {'Welcome'}
          </MDBox>
        </MDBox>
      </Card>
    </>
  );
}

export default FirstPage;
