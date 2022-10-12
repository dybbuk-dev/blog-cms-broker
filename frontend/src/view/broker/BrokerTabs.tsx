import {
  AppBar,
  Tabs,
  Tab,
  tabsClasses,
  styled,
} from '@mui/material';
import { i18n } from 'src/i18n';

interface StyledTabProps {
  label: string;
}

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontSize: '1rem',
  fontWeight: theme.typography.fontWeightMedium,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

interface BrokerTabsProps {
  orientation?: 'horizontal' | 'vertical';
  labels?: any[];
  value?: number;
  onChange?: any;
  broker?: number;
}

function BrokerTabs(props: BrokerTabsProps) {
  const { orientation, value, onChange, labels, broker } =
    props;
  const tabLabels = [
    ...(labels || [
      'broker',
      'overview',
      'characteristics',
      'platform',
      'markets',
      'spreads',
      'service',
      'test',
      'old',
    ]),
    broker && 'articles',
  ].filter(Boolean);
  return (
    <AppBar position="static">
      <AntTabs
        orientation={orientation}
        value={value}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        {tabLabels.map((tabLabel) =>
          Boolean(tabLabel.raw) ? (
            <AntTab key={tabLabel} label={tabLabel.label} />
          ) : (
            <AntTab
              key={tabLabel}
              label={i18n(
                `entities.broker.tabs.${tabLabel}`,
              )}
            />
          ),
        )}
      </AntTabs>
    </AppBar>
  );
}

BrokerTabs.defaultProps = {
  orientation: 'horizontal',
};

export default BrokerTabs;
