import { CardMedia } from '@mui/material';
import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import BrokerAttrs from 'src/view/home/broker/shared/BrokerAttrs';
import BrokerCheckbox from 'src/view/home/broker/shared/BrokerCheckbox';
import BrokerHomepageUrls from 'src/view/home/broker/components/BrokerHomepageUrls';
import HtmlView from 'src/view/shared/view/HtmlView';
import Icon from '@mui/material/Icon';
import MDTypography from 'src/mui/components/MDTypography';
import Tooltip from '@mui/material/Tooltip';
import SingleCheckbox from 'src/view/home/broker/components/SingleCheckbox';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';

function BrokerCharacteristicsView({ record }) {
  const { sidenavColor } = selectMuiSettings();
  return (
    <>
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
        <Grid xs={12} item>
          <SingleCheckbox
            record={record}
            fields={[
              'OFFICE_IN_GERMANY',
              'REGULATION_AND_DEPOSIT_SECURITY',
              'SEGREGATED_ACCOUNTS',
            ]}
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
        <Grid md={8} xs={12} item>
          <AttrTypography
            children={record.meta?.minimum_deposit}
            noIndent
          ></AttrTypography>
        </Grid>
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
        <Grid xs={12} item>
          <SingleCheckbox
            record={record}
            fields={[
              'ACCOUNT_CURRENCIES',
              'POSIBILITIES_FOR_WITHDRAWALS',
              'RESERVE_LIABILIRY',
              'INTEREST_ON_DEPOSIT',
            ]}
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
          {i18n(
            `entities.broker.enumerators.meta.withholding_tax.${record.meta?.withholding_tax}`,
          )}
        </Grid>
      </Grid>
      <BrokerHomepageUrls record={record} />
    </>
  );
}

export default BrokerCharacteristicsView;
