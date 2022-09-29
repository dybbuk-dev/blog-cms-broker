import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import BrokerCharacteristicsView from 'src/view/home/broker/components/BrokerCharacteristicsView';
import BrokerHeader from 'src/view/home/broker/components/BrokerHeader';
import BrokerMarketsView from 'src/view/home/broker/components/BrokerMarketsView';
import BrokerOverviewView from 'src/view/home/broker/components/BrokerOverviewView';
import BrokerPlatformView from 'src/view/home/broker/components/BrokerPlatformView';
import BrokerServiceView from 'src/view/home/broker/components/BrokerServiceView';
import BrokerSpreadsView from 'src/view/home/broker/components/BrokerSpreadsView';
import BrokerTabs from 'src/view/broker/BrokerTabs';
import brokerViewActions from 'src/modules/broker/view/brokerViewActions';
import brokerViewSelectors from 'src/modules/broker/view/brokerViewSelectors';
import MDBox from 'src/mui/components/MDBox';
import PageContent from 'src/view/shared/view/PageContent';
import Spinner from 'src/view/shared/Spinner';
import TabPanel from 'src/view/shared/tab/TabPanel';
import Layout from 'src/view/home/Layout';

const BrokerViewPage = () => {
  const [dispatched, setDispatched] = useState(false);

  const dispatch = useDispatch();

  const match = useRouteMatch();

  const loading = useSelector(
    brokerViewSelectors.selectLoading,
  );
  const record = useSelector(
    brokerViewSelectors.selectRecord,
  );

  useEffect(() => {
    dispatch(brokerViewActions.doFind(match.url));
    setDispatched(true);
  }, [match.url]);

  const [tabValue, setTabValue] = useState(0);

  const handleSetTabValue = (event: any, newValue: any) =>
    setTabValue(newValue);

  return (
    <Layout>
      <MDBox display="flex" flexDirection="column" gap={2}>
        {loading && <Spinner />}
        {dispatched && !loading && record && (
          <>
            <PageContent>
              <BrokerHeader record={record} />
              <MDBox py={2}>
                <BrokerTabs
                  labels={[
                    'overview',
                    'characteristics',
                    'platform',
                    'markets',
                    'spreads',
                    'service',
                  ]}
                  value={tabValue}
                  onChange={handleSetTabValue}
                />
              </MDBox>
              <MDBox py={3}>
                <TabPanel value={tabValue} index={0}>
                  <BrokerOverviewView record={record} />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <BrokerCharacteristicsView
                    record={record}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <BrokerPlatformView record={record} />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                  <BrokerMarketsView record={record} />
                </TabPanel>
                <TabPanel value={tabValue} index={4}>
                  <BrokerSpreadsView record={record} />
                </TabPanel>
                <TabPanel value={tabValue} index={5}>
                  <BrokerServiceView record={record} />
                </TabPanel>
              </MDBox>
            </PageContent>
          </>
        )}
      </MDBox>
    </Layout>
  );
};

export default BrokerViewPage;
