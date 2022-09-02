import { AppBar, Tabs, Tab } from '@mui/material';
import { i18n } from 'src/i18n';

interface BrokerTabsProps {
  orientation?: 'horizontal' | 'vertical';
  value?: number;
  onChange?: any;
}

function BrokerTabs(props: BrokerTabsProps) {
  const { orientation, value, onChange } = props;
  const tabLabels = [
    'broker',
    'overview',
    'characteristics',
    'platform',
    'markets',
    'spreads',
    'service',
    'test',
    'old',
  ];
  return (
    <AppBar position="static">
      <Tabs
        orientation={orientation}
        value={value}
        onChange={onChange}
      >
        {tabLabels.map((tabLabel) => (
          <Tab
            key={tabLabel}
            label={i18n(`entities.broker.tabs.${tabLabel}`)}
          />
        ))}
      </Tabs>
    </AppBar>
  );
}

BrokerTabs.defaultProps = {
  orientation: 'horizontal',
};

export default BrokerTabs;