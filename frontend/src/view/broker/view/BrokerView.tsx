import { useState } from 'react';
import MDBox from 'src/mui/components/MDBox';
import BrokerTabs from 'src/view/broker/BrokerTabs';
import BrokerBaseView from 'src/view/broker/view/components/BrokerBaseView';
import Spinner from 'src/view/shared/Spinner';
import TabPanel from 'src/view/shared/tab/TabPanel';

function BrokerView(props) {
  const [tabValue, setTabValue] = useState(0);

  const handleSetTabValue = (event: any, newValue: any) =>
    setTabValue(newValue);

  const renderView = () => {
    return (
      <>
        <MDBox mb={3}>
          <BrokerTabs
            value={tabValue}
            onChange={handleSetTabValue}
          />
        </MDBox>
        <TabPanel value={tabValue} index={0}>
          <BrokerBaseView {...props} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          Metadata
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          Overview
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          Characteristics
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          Platform
        </TabPanel>
        <TabPanel value={tabValue} index={5}>
          Markets
        </TabPanel>
        <TabPanel value={tabValue} index={6}>
          Spreads
        </TabPanel>
        <TabPanel value={tabValue} index={7}>
          Service
        </TabPanel>
        <TabPanel value={tabValue} index={8}>
          Test
        </TabPanel>
        <TabPanel value={tabValue} index={9}>
          Old
        </TabPanel>
      </>
    );
  };

  const { record, loading } = props;

  if (loading || !record) {
    return <Spinner />;
  }

  return renderView();
}

export default BrokerView;
