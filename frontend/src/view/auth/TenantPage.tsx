import MaterialLink from '@mui/material/Link';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TenantNewForm from 'src/view/auth/TenantNewForm';
import TenantSelectForm from 'src/view/auth/TenantSelectForm';

// @mui material components
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDInput from 'src/mui/components/MDInput';
import MDButton from 'src/mui/components/MDButton';

// Authentication layout components
import CoverLayout from 'src/mui/layouts/authentication/components/CoverLayout';

// Images
import bgImage from 'src/mui/assets/images/bg-sign-up-cover.jpeg';
import MDAvatar from 'src/mui/components/MDAvatar';
import { BrandLogo } from 'src/assets/resources';

import { Link } from 'react-router-dom';

function TenantPage(): JSX.Element {
  const [view, setView] = useState('form');
  const dispatch = useDispatch();

  const invitedTenants = useSelector(
    selectors.selectInvitedTenants,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  useEffect(() => {
    setView(invitedTenants.length ? 'select' : 'form');
  }, [invitedTenants]);

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  const doToggleView = () => {
    setView((prevView) =>
      prevView === 'form' ? 'select' : 'form',
    );
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDBox
            display="flex"
            justifyContent="center"
            pt={3}
          >
            <BrandLogo width="80%" />
          </MDBox>
          <MDTypography
            display="block"
            variant="button"
            color="white"
            mt={2}
            fontSize="small"
          >
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {view === 'form' ? (
            <TenantNewForm onViewToggle={doToggleView} />
          ) : (
            <TenantSelectForm onViewToggle={doToggleView} />
          )}
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              <MDTypography
                component={Link}
                to="#"
                variant="button"
                color="info"
                fontWeight="medium"
                onClick={doSignout}
                textGradient
              >
                {i18n('auth.signout')}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default TenantPage;
