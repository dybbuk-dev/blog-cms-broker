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

function BrokerForm(props) {
  const { sidenavColor } = selectMuiSettings();

  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      // #region Base
      name: record.name,
      navigation: record.navigation,
      name_normalized: record.name_normalized,
      activated: record.activated,
      is_broker: record.is_broker,
      is_compareable: record.is_compareable,
      top_broker: record.top_broker,
      top_binary_broker: record.top_binary_broker,
      top_forex_broker: record.top_forex_broker,
      featured_broker: record.featured_broker,
      pdf: record.pdf,
      author: record.author,
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
          <MDBox mb={3}>
            <BrokerTabs
              value={tabValue}
              onChange={handleSetTabValue}
            />
          </MDBox>
          <TabPanel value={tabValue} index={0}>
            <BrokerBaseForm />
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
