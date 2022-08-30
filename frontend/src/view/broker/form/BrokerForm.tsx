import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import brokerEnumerators from '../../../modules/broker/brokerEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import BrokerAutocompleteFormItem from 'src/view/broker/autocomplete/BrokerAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import NavigationAutocompleteFormItem from 'src/view/navigation/autocomplete/NavigationAutocompleteFormItem';

const schema = yup.object().shape({
  navigation: yupFormSchemas.relationToOne(
    i18n('entities.broker.fields.navigation'),
    {},
  ),
  name: yupFormSchemas.string(
    i18n('entities.broker.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  name_normalized: yupFormSchemas.string(
    i18n('entities.broker.fields.name_normalized'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.broker.fields.activated'),
    {},
  ),
  is_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.is_broker'),
    {},
  ),
  is_compareable: yupFormSchemas.boolean(
    i18n('entities.broker.fields.is_compareable'),
    {},
  ),
  top_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.top_broker'),
    {},
  ),
  top_binary_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.top_binary_broker'),
    {},
  ),
  top_forex_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.top_forex_broker'),
    {},
  ),
  featured_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.featured_broker'),
    {},
  ),
  pdf: yupFormSchemas.boolean(
    i18n('entities.broker.fields.pdf'),
    {},
  ),
});

function BrokerForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      name: record.name,
      link: record.link,
      title: record.title,
      target: record.target,
      sort: record.sort ?? 0,
      activated: record.activated,
      show_user_logged_in: record.show_user_logged_in,
      show_in_broker: record.show_in_broker,
      type: record.type ?? 'NONE',
      parent: record.parent,
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

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={2} container>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="name"
                label={i18n('entities.broker.fields.name')}
                variant="standard"
                required={true}
                autoFocus
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NavigationAutocompleteFormItem
                name="navigation"
                label={i18n(
                  'entities.broker.fields.navigation',
                )}
                required={true}
                showCreate={true}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputFormItem
                name="name_normalized"
                label={i18n(
                  'entities.broker.fields.name_normalized',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={6} xs={12}></Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CheckboxFormItem
                name="activated"
                label={i18n(
                  'entities.broker.fields.activated',
                )}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CheckboxFormItem
                name="is_broker"
                label={i18n(
                  'entities.broker.fields.is_broker',
                )}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CheckboxFormItem
                name="is_compareable"
                label={i18n(
                  'entities.broker.fields.is_compareable',
                )}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CheckboxFormItem
                name="top_broker"
                label={i18n(
                  'entities.broker.fields.top_broker',
                )}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CheckboxFormItem
                name="top_binary_broker"
                label={i18n(
                  'entities.broker.fields.top_binary_broker',
                )}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CheckboxFormItem
                name="top_forex_broker"
                label={i18n(
                  'entities.broker.fields.top_forex_broker',
                )}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CheckboxFormItem
                name="featured_broker"
                label={i18n(
                  'entities.broker.fields.featured_broker',
                )}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <CheckboxFormItem
                name="pdf"
                label={i18n('entities.broker.fields.pdf')}
              />
            </Grid>
          </Grid>
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
