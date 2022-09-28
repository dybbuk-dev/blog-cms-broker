import { CardMedia } from '@mui/material';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import BrokerArticlePage from 'src/view/home/broker/BrokerArticlePage';
import BrokerAttrs from 'src/view/home/broker/shared/BrokerAttrs';
import BrokerImages from 'src/view/home/broker/shared/BrokerImages';
import BrokerPostPage from 'src/view/home/broker/BrokerPostPage';
import BrokerUpsides from 'src/view/home/broker/shared/BrokerUpsides';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import HtmlView from 'src/view/shared/view/HtmlView';
import Icon from '@mui/material/Icon';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import BrokerCheckbox from 'src/view/home/broker/shared/BrokerCheckbox';

function BrokerCharacteristicsView({ record }) {
  const { sidenavColor } = selectMuiSettings();
  console.log(record);
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <MDTypography variant="h4" pb={2}>
          {i18n('entities.broker.text.portrait')}
        </MDTypography>
        <HtmlView value={record.meta?.description} />
      </Grid>
      <Grid xs={12} item>
        <MDTypography variant="h4" mt={2}>
          {i18n('entities.broker.text.introduction')}
        </MDTypography>
        <CardMedia
          src={`https://www.youtube.com/watch?v=${record.video?.youtube_hash}`}
        />
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.licensed_broker`,
          )}
          <Tooltip
            title={i18n(
              `entities.broker.characteristics.tooltip.licensed_broker`,
            )}
          >
            <Icon color="secondary">help</Icon>
          </Tooltip>
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <MDTypography color="text">
          {Boolean(record.meta?.licensed_broker)
            ? i18n('common.yes')
            : i18n('common.no')}
        </MDTypography>
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.office_in_germany`,
          )}
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <BrokerCheckbox
          record={record}
          field={'office_in_germany'}
        />
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.regulation_deposit_insurance`,
          )}
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <BrokerCheckbox
          record={record}
          field={'regulation_and_deposit_security'}
        />
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.customer_funds_separated`,
          )}
          <Tooltip
            title={i18n(
              `entities.broker.characteristics.tooltip.customer_funds_separated`,
            )}
          >
            <Icon color="secondary">help</Icon>
          </Tooltip>
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <BrokerCheckbox
          record={record}
          field={'segregated_accounts'}
        />
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.minimum_deposit`,
          )}
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item></Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.bonus`,
          )}
          <Tooltip
            title={i18n(
              `entities.broker.characteristics.tooltip.bonus`,
            )}
          >
            <Icon color="secondary">help</Icon>
          </Tooltip>
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <BrokerCheckbox record={record} field={'bonus'} />
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.accounting_bank`,
          )}
          <Tooltip
            title={i18n(
              `entities.broker.characteristics.tooltip.accounting_bank`,
            )}
          >
            <Icon color="secondary">help</Icon>
          </Tooltip>
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <BrokerAttrs records={record.banks} />
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.accounting_currencies`,
          )}
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <BrokerCheckbox
          record={record}
          field={'account_currencies'}
        />
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.opportunities_for_deposits_and_withdrawals`,
          )}
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <BrokerCheckbox
          record={record}
          field={'posibilities_for_withdrawals'}
        />
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.obligation_to_make_additional_payments`,
          )}
          <Tooltip
            title={i18n(
              `entities.broker.characteristics.tooltip.obligation_to_make_additional_payments`,
            )}
          >
            <Icon color="secondary">help</Icon>
          </Tooltip>
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <BrokerCheckbox
          record={record}
          field={'reserve_liabiliry'}
        />
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.interest_on_account_deposit`,
          )}
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <BrokerCheckbox
          record={record}
          field={'interest_on_deposit'}
        />
      </Grid>
      <Grid md={4} xs={12} item>
        <MDTypography
          variant="h5"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {i18n(
            `entities.broker.characteristics.fields.withholding_tax`,
          )}
        </MDTypography>
      </Grid>
      <Grid md={8} xs={12} item>
        <BrokerCheckbox
          record={record}
          field={'witholding_tax'}
        />
      </Grid>
      <Grid md={6} xs={12} item>
        <MDButton
          variant="contained"
          href={record.meta?.homepage}
          target="_blank"
          color={sidenavColor}
          startIcon={<SendIcon />}
          fullWidth
        >
          {i18n('entities.broker.text.nowTo', record.name)}
        </MDButton>
      </Grid>
      <Grid md={6} xs={12} item>
        <MDButton
          variant="contained"
          target="_blank"
          href={record.meta?.demo_url}
          color="primary"
          startIcon={<SendIcon />}
          fullWidth
        >
          {i18n('entities.broker.text.freeDemoAccount')}
        </MDButton>
      </Grid>
    </Grid>
  );
}

export default BrokerCharacteristicsView;
