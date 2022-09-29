import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import AttachLink from 'src/view/home/broker/shared/AttachLink';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import BrokerHomepageUrls from 'src/view/home/broker/components/BrokerHomepageUrls';
import MDTypography from 'src/mui/components/MDTypography';
import SingleCheckbox from 'src/view/home/broker/components/SingleCheckbox';

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
            {'https://afftracking.activetrades.com/'}
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
          <AttrTypography
            children={record.address?.line_0}
            noIndent
          ></AttrTypography>
          <AttrTypography
            children={record.address?.line_1}
            noIndent
          ></AttrTypography>
          <AttrTypography
            children={record.address?.line_2}
            noIndent
          ></AttrTypography>
          <AttrTypography
            children={record.address?.line_3}
            noIndent
          ></AttrTypography>
          <AttrTypography
            children={record.address?.line_4}
            noIndent
          ></AttrTypography>
          <AttrTypography
            children={record.address?.line_5}
            noIndent
          ></AttrTypography>
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
      <BrokerHomepageUrls record={record} />
    </>
  );
}

export default BrokerServiceView;
