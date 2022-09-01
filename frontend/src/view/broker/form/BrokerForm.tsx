import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import BrokerBaseForm from 'src/view/broker/form/components/BrokerBaseForm';
import schema from 'src/view/broker/form/schemas/FormSchema';
import MDBox from 'src/mui/components/MDBox';
import TabPanel from 'src/view/shared/tab/TabPanel';
import BrokerTabs from 'src/view/broker/BrokerTabs';
import BrokerOverviewForm from 'src/view/broker/form/components/BrokerOverviewForm';

function BrokerForm(props) {
  const { sidenavColor } = selectMuiSettings();

  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      // #region Base
      name: record.name,
      name_normalized: record.name_normalized,
      navigation: record.navigation || {},
      author: record.author || {},
      activated: record.activated,
      is_broker: record.is_broker,
      is_compareable: record.is_compareable,
      top_broker: record.top_broker,
      top_binary_broker: record.top_binary_broker,
      top_forex_broker: record.top_forex_broker,
      featured_broker: record.featured_broker,
      pdf: record.pdf,
      // #endregion

      // #region Broker's Categories
      categories: (record.categories || []).map(
        (v) => v.category || {},
      ),
      categories_in_top_lists: (record.categories || [])
        .filter((v) => v.show_in_top_listings)
        .map((v) => v.category || {}),
      // #endregion

      // #region Broker Meta
      homepage: record.meta?.homepage,
      homepage_title: record.meta?.homepage_title,
      homepage_impression: record.meta?.homepage_impression,
      broker_type: record.meta?.broker_type,
      description: record.meta?.description,
      teaser: record.meta?.teaser,
      demo_url: record.meta?.demo_url,
      account_url: record.meta?.account_url,
      maximum_leverage: record.meta?.maximum_leverage,
      minimum_deposit: record.meta?.minimum_deposit,
      minimum_deposit_short:
        record.meta?.minimum_deposit_short,
      custodian_fees: record.meta?.custodian_fees,
      mobile_trading: record.meta?.mobile_trading,
      phone_order: record.meta?.phone_order,
      licensed_broker: record.meta?.licensed_broker,
      withholding_tax: record.meta?.withholding_tax,
      scalping_allowed: record.meta?.scalping_allowed,
      // #endregion

      // #region Broker Upside
      upsides: record.upsides,
      // #endregion

      // #region Broker Regulatory Authority
      regulatory_authorities: record.regulatory_authorities,
      // #endregion

      // #region Broker Deposit Guarantee
      deposit_guarantees: record.deposit_guarantees,
      // #endregion

      // #region Broker Certificate
      certificates: record.certificates,
      // #endregion
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  const { saveLoading, modal } = props;

  const [tabValue, setTabValue] = useState(0);

  const handleSetTabValue = (event: any, newValue: any) =>
    setTabValue(newValue);

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MDBox>
            <BrokerTabs
              value={tabValue}
              onChange={handleSetTabValue}
            />
          </MDBox>
          <MDBox py={3}>
            <TabPanel value={tabValue} index={0}>
              <BrokerBaseForm {...props} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <BrokerOverviewForm {...props} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              Characteristics
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              Platform
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              Markets
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
              Spreads
            </TabPanel>
            <TabPanel value={tabValue} index={6}>
              Service
            </TabPanel>
            <TabPanel value={tabValue} index={7}>
              Test
            </TabPanel>
            <TabPanel value={tabValue} index={8}>
              Old
            </TabPanel>
          </MDBox>
          <FormButtons
            style={{
              flexDirection: modal
                ? 'row-reverse'
                : undefined,
            }}
          >
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </MDButton>

            <MDButton
              variant="outlined"
              color={sidenavColor}
              disabled={saveLoading}
              onClick={onReset}
              type="button"
              startIcon={<UndoIcon />}
              size="small"
            >
              {i18n('common.reset')}
            </MDButton>

            {props.onCancel ? (
              <MDButton
                variant="outlined"
                color={sidenavColor}
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                type="button"
                startIcon={<CloseIcon />}
                size="small"
              >
                {i18n('common.cancel')}
              </MDButton>
            ) : null}
          </FormButtons>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default BrokerForm;
