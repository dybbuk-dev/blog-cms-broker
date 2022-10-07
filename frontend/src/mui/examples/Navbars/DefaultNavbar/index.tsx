import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { Theme } from '@mui/material/styles';
import {
  useState,
  useEffect,
  ReactNode,
  Fragment,
} from 'react';
import breakpoints from 'src/mui/assets/theme/base/breakpoints';
import Container from '@mui/material/Container';
import DefaultNavbarDropdown from 'src/mui/examples/Navbars/DefaultNavbar/DefaultNavbarDropdown';
import DefaultNavbarMobile from 'src/mui/examples/Navbars/DefaultNavbar/DefaultNavbarMobile';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Grow, { GrowProps } from '@mui/material/Grow';
import Icon from '@mui/material/Icon';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import MuiLink from '@mui/material/Link';
import Popper from '@mui/material/Popper';

// Declaring props types for DefaultNavbar
interface Props {
  routes: {
    [key: string]:
      | ReactNode
      | string
      | {
          [key: string]: string | any;
        }[];
  }[];
  brand?: string;
  transparent?: boolean;
  light?: boolean;
  action?: {
    type: 'external' | 'internal';
    route: string;
    color:
      | 'primary'
      | 'secondary'
      | 'info'
      | 'success'
      | 'warning'
      | 'error'
      | 'dark'
      | 'light';
    label: string;
  };
  fixed?: boolean;
}

interface NewGrowTypes extends GrowProps {
  sx: any;
  [key: string]: any;
}

function NewGrow(props: NewGrowTypes) {
  return <Grow {...props} />;
}

function DefaultNavbar({
  routes,
  brand,
  transparent,
  light,
  action,
  fixed = true,
}: Props): JSX.Element {
  const { darkMode } = selectMuiSettings();

  const [dropdown, setDropdown] = useState<any>('');
  const [dropdownEl, setDropdownEl] = useState<any>('');
  const [dropdownName, setDropdownName] = useState<any>('');
  const [nestedDropdown, setNestedDropdown] =
    useState<any>('');
  const [nestedDropdownEl, setNestedDropdownEl] =
    useState<any>('');
  const [nestedDropdownName, setNestedDropdownName] =
    useState<any>('');
  const [arrowRef, setArrowRef] = useState<any>(null);
  const [mobileNavbar, setMobileNavbar] =
    useState<boolean>(false);
  const [mobileView, setMobileView] =
    useState<boolean>(false);

  const openMobileNavbar = () =>
    setMobileNavbar(!mobileNavbar);

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /**
     The event listener that's calling the displayMobileNavbar function when
     resizing the window.
    */
    window.addEventListener('resize', displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () =>
      window.removeEventListener(
        'resize',
        displayMobileNavbar,
      );
  }, []);

  const renderNavbarItems = routes.map(
    ({ name, icon, href, route, children }: any) => (
      <DefaultNavbarDropdown
        key={name}
        name={name}
        icon={icon}
        href={
          Boolean(children && children.length) ? null : href
        }
        route={
          Boolean(children && children.length)
            ? null
            : route
        }
        collapse={Boolean(children && children.length)}
        onMouseEnter={({ currentTarget }: any) => {
          if (Boolean(children && children.length)) {
            setDropdown(currentTarget);
            setDropdownEl(currentTarget);
            setDropdownName(name);
          }
        }}
        onMouseLeave={() =>
          Boolean(children && children.length) &&
          setDropdown(null)
        }
        light={light}
      />
    ),
  );

  // Render the routes on the dropdown menu
  const renderRoutes = routes.map(
    ({ name, children, columns, rowsPerColumn }: any) => {
      let template;

      // Render the dropdown menu that should be display as columns
      if (children && columns && name === dropdownName) {
        const calculateColumns = children.reduce(
          (resultArray: any, item: any, index: any) => {
            const chunkIndex = Math.floor(
              index / rowsPerColumn,
            );

            if (!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [];
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
          },
          [],
        );

        template = (
          <Grid
            key={name}
            container
            spacing={3}
            py={1}
            px={1.5}
          >
            {calculateColumns.map((cols: any, key: any) => {
              const gridKey = `grid-${key}`;
              const dividerKey = `divider-${key}`;

              return (
                <Grid
                  key={gridKey}
                  item
                  xs={12 / columns}
                  sx={{ position: 'relative' }}
                >
                  {cols.map((col: any, index: any) => (
                    <Fragment key={col.name}>
                      <MDBox
                        width="100%"
                        display="flex"
                        alignItems="center"
                        py={1}
                        mt={index !== 0 ? 2 : 0}
                      >
                        {col.icon && (
                          <MDBox
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="1.5rem"
                            height="1.5rem"
                            borderRadius="md"
                            color="text"
                            mr={1}
                            fontSize="1rem"
                            lineHeight={1}
                          >
                            {col.icon}
                          </MDBox>
                        )}
                        <MDTypography
                          display="block"
                          variant="button"
                          fontWeight="bold"
                          textTransform="capitalize"
                        >
                          {col.name}
                        </MDTypography>
                      </MDBox>
                      {col.children.map((item: any) => (
                        <MDTypography
                          key={item.name}
                          component={
                            item.route ? Link : MuiLink
                          }
                          to={item.route ? item.route : ''}
                          href={
                            item.href
                              ? item.href
                              : (e: any) =>
                                  e.preventDefault()
                          }
                          target={item.href ? '_blank' : ''}
                          rel={
                            item.href
                              ? 'noreferrer'
                              : 'noreferrer'
                          }
                          minWidth="11.25rem"
                          display="block"
                          variant="button"
                          color="text"
                          textTransform="capitalize"
                          fontWeight="regular"
                          py={0.625}
                          px={2}
                          sx={({
                            palette: { grey, dark },
                            borders: { borderRadius },
                          }: Theme) => ({
                            borderRadius: borderRadius.md,
                            cursor: 'pointer',
                            transition: 'all 300ms linear',

                            '&:hover': {
                              backgroundColor: grey[200],
                              color: dark.main,
                            },
                          })}
                        >
                          {item.name}
                        </MDTypography>
                      ))}
                    </Fragment>
                  ))}
                  {key !== 0 && (
                    <Divider
                      key={dividerKey}
                      orientation="vertical"
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '-4px',
                        transform: 'translateY(-45%)',
                        height: '90%',
                      }}
                    />
                  )}
                </Grid>
              );
            })}
          </Grid>
        );

        // Render the dropdown menu that should be display as list items
      } else if (children && name === dropdownName) {
        template = children.map((item: any) => {
          const linkComponent = {
            component: MuiLink,
            href: item.href,
            target: '_blank',
            rel: 'noreferrer',
          };

          const routeComponent = {
            component: Link,
            to: item.route,
          };

          return (
            <MDTypography
              key={item.name}
              {...(item.route
                ? routeComponent
                : linkComponent)}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              variant="button"
              textTransform="capitalize"
              minWidth={
                item.description ? '14rem' : '12rem'
              }
              color={item.description ? 'dark' : 'text'}
              fontWeight={
                item.description ? 'bold' : 'regular'
              }
              py={item.description ? 1 : 0.625}
              px={2}
              sx={({
                palette: { grey, dark },
                borders: { borderRadius },
              }: Theme) => ({
                borderRadius: borderRadius.md,
                cursor: 'pointer',
                transition: 'all 300ms linear',

                '&:hover': {
                  backgroundColor: grey[200],
                  color: dark.main,

                  '& *': {
                    color: dark.main,
                  },
                },
              })}
              onMouseEnter={({ currentTarget }: any) => {
                if (item.dropdown) {
                  setNestedDropdown(currentTarget);
                  setNestedDropdownEl(currentTarget);
                  setNestedDropdownName(item.name);
                }
              }}
              onMouseLeave={() => {
                if (item.dropdown) {
                  setNestedDropdown(null);
                }
              }}
            >
              {item.description ? (
                <MDBox
                  display="flex"
                  py={0.25}
                  fontSize="1rem"
                  color="text"
                >
                  {item.icon && (
                    <>
                      {typeof item.icon === 'string' ? (
                        <Icon color="inherit">
                          {item.icon}
                        </Icon>
                      ) : (
                        <MDBox color="inherit">
                          {item.icon}
                        </MDBox>
                      )}
                    </>
                  )}
                  <MDBox pl={1} lineHeight={0}>
                    <MDTypography
                      variant="button"
                      display="block"
                      fontWeight="bold"
                      textTransform="capitalize"
                    >
                      {item.name}
                    </MDTypography>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                    >
                      {item.description}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              ) : (
                <MDBox
                  display="flex"
                  alignItems="center"
                  color="text"
                >
                  {item.icon && (
                    <Icon sx={{ mr: 1 }}>{item.icon}</Icon>
                  )}
                  {item.name}
                </MDBox>
              )}
              {item.children && (
                <Icon
                  sx={{
                    fontWeight: 'normal',
                    verticalAlign: 'middle',
                    mr: -0.5,
                  }}
                >
                  keyboard_arrow_right
                </Icon>
              )}
            </MDTypography>
          );
        });
      }

      return template;
    },
  );

  // Routes dropdown menu
  const dropdownMenu = (
    <Popper
      anchorEl={dropdown}
      popperRef={null}
      open={Boolean(dropdown)}
      placement="bottom-start"
      transition
      style={{ zIndex: 10 }}
      modifiers={[
        {
          name: 'arrow',
          enabled: true,
          options: {
            element: arrowRef,
          },
        },
      ]}
      onMouseEnter={() => setDropdown(dropdownEl)}
      onMouseLeave={() => {
        if (!nestedDropdown) {
          setDropdown(null);
          setDropdownName('');
        }
      }}
    >
      {({ TransitionProps }) => (
        <NewGrow
          {...TransitionProps}
          sx={{
            transformOrigin: 'left top',
            background: ({
              palette: { mode, white, dark },
            }: Theme) =>
              mode === 'dark' ? dark.main : white.main,
          }}
        >
          <MDBox borderRadius="lg">
            <MDTypography
              variant="h1"
              textAlign="center"
              sx={{
                color: ({
                  palette: { mode, white, dark },
                }: Theme) =>
                  mode === 'dark' ? dark.main : white.main,
              }}
            >
              <Icon ref={setArrowRef} sx={{ mt: -3 }}>
                arrow_drop_up
              </Icon>
            </MDTypography>
            <MDBox
              shadow="lg"
              borderRadius="lg"
              p={1.625}
              mt={1}
            >
              {renderRoutes}
            </MDBox>
          </MDBox>
        </NewGrow>
      )}
    </Popper>
  );

  // Render routes that are nested inside the dropdown menu routes
  const renderNestedRoutes = routes.map(
    ({ children, columns }: any) =>
      children && !columns
        ? children.map(
            ({
              name: parentName,
              children: nestedCollapse,
            }: any) => {
              let template;

              if (parentName === nestedDropdownName) {
                template =
                  nestedCollapse &&
                  nestedCollapse.map((item: any) => {
                    const linkComponent = {
                      component: MuiLink,
                      href: item.href,
                      target: '_blank',
                      rel: 'noreferrer',
                    };

                    const routeComponent = {
                      component: Link,
                      to: item.route,
                    };

                    return (
                      <MDTypography
                        key={item.name}
                        {...(item.route
                          ? routeComponent
                          : linkComponent)}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        variant="button"
                        textTransform="capitalize"
                        minWidth={
                          item.description
                            ? '14rem'
                            : '12rem'
                        }
                        color={
                          item.description ? 'dark' : 'text'
                        }
                        fontWeight={
                          item.description
                            ? 'bold'
                            : 'regular'
                        }
                        py={item.description ? 1 : 0.625}
                        px={2}
                        sx={({
                          palette: { grey, dark },
                          borders: { borderRadius },
                        }: Theme) => ({
                          borderRadius: borderRadius.md,
                          cursor: 'pointer',
                          transition: 'all 300ms linear',

                          '&:hover': {
                            backgroundColor: grey[200],
                            color: dark.main,

                            '& *': {
                              color: dark.main,
                            },
                          },
                        })}
                      >
                        {item.description ? (
                          <MDBox>
                            {item.name}
                            <MDTypography
                              display="block"
                              variant="button"
                              color="text"
                              fontWeight="regular"
                              sx={{
                                transition:
                                  'all 300ms linear',
                              }}
                            >
                              {item.description}
                            </MDTypography>
                          </MDBox>
                        ) : (
                          item.name
                        )}
                        {item.children && (
                          <Icon
                            fontSize="small"
                            sx={{
                              fontWeight: 'normal',
                              verticalAlign: 'middle',
                              mr: -0.5,
                            }}
                          >
                            keyboard_arrow_right
                          </Icon>
                        )}
                      </MDTypography>
                    );
                  });
              }

              return template;
            },
          )
        : null,
  );

  // Dropdown menu for the nested dropdowns
  const nestedDropdownMenu = (
    <Popper
      anchorEl={nestedDropdown}
      popperRef={null}
      open={Boolean(nestedDropdown)}
      placement="right-start"
      transition
      style={{ zIndex: 10 }}
      onMouseEnter={() => {
        setNestedDropdown(nestedDropdownEl);
      }}
      onMouseLeave={() => {
        setNestedDropdown(null);
        setNestedDropdownName('');
        setDropdown(null);
      }}
    >
      {({ TransitionProps }) => (
        <NewGrow
          {...TransitionProps}
          sx={{
            transformOrigin: 'left top',
            background: ({
              palette: { mode, white, dark },
            }: Theme) =>
              mode === 'dark' ? dark.main : white.main,
          }}
        >
          <MDBox ml={2.5} mt={-2.5} borderRadius="lg">
            <MDBox
              shadow="lg"
              borderRadius="lg"
              py={1.5}
              px={1}
              mt={2}
            >
              {renderNestedRoutes}
            </MDBox>
          </MDBox>
        </NewGrow>
      )}
    </Popper>
  );

  // const TagRoot = fixed ? MDBox : Card;
  const TagRoot = MDBox;

  return (
    <Container>
      <MDBox
        pt={3}
        pb={2}
        m={fixed ? 1 : 0}
        color={light ? 'white' : 'text'}
        position={fixed ? 'absolute' : 'relative'}
        left={0}
        zIndex={3}
      >
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MDBox component={Link} to="/">
            <MDTypography
              display="block"
              component="span"
              color="warning"
              fontSize="32px"
              fontWeight="bold"
              lineHeight={1}
            >
              Broker-Bewertungen.de
            </MDTypography>
            <MDTypography
              display="block"
              component="span"
              fontSize="15px"
              fontWeight="regular"
              lineHeight={1}
              my={1}
            >
              Erfahrungen & Tests von Tradern für Trader
              seit 2009
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            flexWrap="wrap"
            gap={2}
            overflow="hidden"
          >
            {[
              {
                img: '/images/crowd-of-users.png',
                title: 'Echte Erfahrungen',
                desc: 'von Tradern',
              },
              {
                img: '/images/balance.png',
                title: '100% unabhängig',
                desc: 'von Tradern für Trader',
              },
              {
                img: '/images/all-infos.png',
                title: 'Alle Infos',
                desc: 'zoom FX & CFD Trading',
              },
            ].map(({ img, title, desc }) => (
              <MDBox
                key={title}
                display="flex"
                alignItems="center"
                opacity={0.5}
                gap={1}
              >
                <img src={img} height="48px" />
                <MDTypography
                  color="text"
                  fontSize="0.75rem"
                  lineHeight={1.25}
                >
                  <b>{title}</b>
                  <br />
                  {desc}
                </MDTypography>
              </MDBox>
            ))}
          </MDBox>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={1}
        >
          <MDBox></MDBox>
          <MDBox
            color="inherit"
            flexGrow={1}
            display={{ xs: 'none', lg: 'flex' }}
            flexWrap="wrap"
            gap={3}
            m={0}
            p={0}
          >
            {renderNavbarItems}
          </MDBox>
          {action &&
            (action.type === 'internal' ? (
              <MDBox
                display={{
                  xs: 'none',
                  lg: 'inline-block',
                }}
              >
                <MDButton
                  component={Link}
                  to={action.route}
                  variant="gradient"
                  color={
                    action.color ? action.color : 'info'
                  }
                  size="small"
                >
                  {action.label}
                </MDButton>
              </MDBox>
            ) : (
              <MDBox
                display={{
                  xs: 'none',
                  lg: 'inline-block',
                }}
              >
                <MDButton
                  component="a"
                  href={action.route}
                  target="_blank"
                  rel="noreferrer"
                  variant="gradient"
                  color={
                    action.color ? action.color : 'info'
                  }
                  size="small"
                  sx={{ mt: -0.3 }}
                >
                  {action.label}
                </MDButton>
              </MDBox>
            ))}
          <MDBox
            display={{ xs: 'inline-block', lg: 'none' }}
            lineHeight={0}
            py={1.5}
            pl={1.5}
            color="inherit"
            sx={{ cursor: 'pointer' }}
            onClick={openMobileNavbar}
          >
            <Icon>{mobileNavbar ? 'close' : 'menu'}</Icon>
          </MDBox>
        </MDBox>
      </MDBox>
      {dropdown && dropdownMenu}
      {nestedDropdown && nestedDropdownMenu}
      {mobileView && (
        <DefaultNavbarMobile
          routes={routes}
          open={mobileNavbar}
        />
      )}
    </Container>
  );
}

// Declaring default props for DefaultNavbar
DefaultNavbar.defaultProps = {
  brand: i18n('app.title'),
  transparent: false,
  light: false,
  action: false,
};

export default DefaultNavbar;
