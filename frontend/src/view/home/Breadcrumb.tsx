import { Link, useRouteMatch } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import navigationHomeSelectors from 'src/modules/navigation/home/navigationHomeSelectors';
import PropTypes from 'prop-types';

function Breadcrumb({ items }) {
  const { sidenavColor } = selectMuiSettings();
  const match = useRouteMatch();
  const loading = useSelector(
    navigationHomeSelectors.selectLoading,
  );
  const navigationItems = useSelector(
    navigationHomeSelectors.selectNavigation,
  );
  if (loading) {
    return null;
  }
  const navItems = [];
  const currentRoute = match.url;
  const selectNavigationItemFn = (item) => {
    if (
      currentRoute.indexOf(
        item.route.replace(/\/*$/, ''),
      ) === 0
    ) {
      navItems.push(item);
      (item.children || []).forEach(selectNavigationItemFn);
    }
  };
  navigationItems.forEach(selectNavigationItemFn);
  const result =
    items || navItems.filter(({ route }) => route !== '/');
  return (
    <MDBox
      display="inline-flex"
      flexWrap="wrap"
      gap={1}
      mb={2}
    >
      {Boolean(navItems.length) &&
        result.map((item, idx, arr) => (
          <MDBox
            key={item.route}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            gap={1}
          >
            {Boolean(idx) && (
              <ArrowRightIcon color="secondary" />
            )}
            <MDTypography
              variant="body2"
              color={
                idx + 1 !== arr.length
                  ? sidenavColor
                  : 'text'
              }
              fontWeight="regular"
            >
              <MaterialLink
                component={Link}
                to={item.route.replace(/\/*$/, '')}
                underline="hover"
                sx={{
                  color: 'inherit !important',
                }}
              >
                {item.name}
              </MaterialLink>
            </MDTypography>
          </MDBox>
        ))}
    </MDBox>
  );
}

Breadcrumb.defaultValues = {
  items: null,
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      route: PropTypes.string,
    }),
  ),
};

export default Breadcrumb;
