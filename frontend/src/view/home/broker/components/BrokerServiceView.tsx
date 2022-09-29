import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import AttachLink from 'src/view/home/broker/shared/AttachLink';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import BrokerHomepageUrls from 'src/view/home/broker/components/BrokerHomepageUrls';
import MDTypography from 'src/mui/components/MDTypography';
import SingleCheckbox from 'src/view/home/broker/components/SingleCheckbox';
import BrokerAddress from 'src/view/home/broker/shared/BrokerAddress';

function BrokerServiceView({ record }) {
  return (
    <>
      <MDTypography variant="h4" pb={2}>
        {i18n('entities.broker.service.title')}
      </MDTypography>
      <Grid spacing={2} container>
        <Grid md={4} xs={12} item>
          <MDTypography
            variant="h5"
            color="text"
            lineHeight="1.25"
            my={1}
          >
            {i18n('entities.broker.service.homepage')}
          </MDTypography>
        </Grid>
        <Grid md={8} xs={12} item>
          <AttachLink link={record.meta?.homepage}>
            {record.meta?.homepage}
          </AttachLink>
        </Grid>
        <Grid md={4} xs={12} item>
          <MDTypography
            variant="h5"
            color="text"
            lineHeight="1.25"
            my={1}
          >
            {i18n('entities.broker.service.address')}
          </MDTypography>
        </Grid>
        <Grid md={8} xs={12} item>
          <BrokerAddress record={record} />
        </Grid>
      </Grid>
      <SingleCheckbox
        record={record}
        fields={[
          'GERMAN_SUPPORT',
          'CONTACT',
          'DAILY_TRADE_HELP',
        ]}
      />
      <MDTypography variant="h4" py={2}>
        {i18n(
          'entities.broker.service.training_opportunities',
        )}
      </MDTypography>
      <SingleCheckbox
        record={record}
        fields={[
          'GERMAN_WEBINAR',
          'GERMAN_SEMINAR',
          'COACHINGS_AVAILABLE',
          'KNOWLEDGE_BASE',
        ]}
      />
    </>
  );
}

export default BrokerServiceView;
