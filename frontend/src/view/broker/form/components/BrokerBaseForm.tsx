import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import AuthorAutocompleteFormItem from 'src/view/author/autocomplete/AuthorAutocompleteFormItem';
import NavigationAutocompleteFormItem from 'src/view/navigation/autocomplete/NavigationAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';

function BrokerBaseForm(props) {
  return (
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
        <InputFormItem
          name="name_normalized"
          label={i18n(
            'entities.broker.fields.name_normalized',
          )}
          variant="standard"
          required={true}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <NavigationAutocompleteFormItem
          name="navigation"
          label={i18n('entities.broker.fields.navigation')}
          required={true}
          showCreate={true}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <AuthorAutocompleteFormItem
          name="author"
          label={i18n('entities.broker.fields.author')}
          required={false}
          showCreate={true}
          variant="standard"
          fullWidth
        />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <CheckboxFormItem
          name="activated"
          label={i18n('entities.broker.fields.activated')}
        />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <CheckboxFormItem
          name="is_broker"
          label={i18n('entities.broker.fields.is_broker')}
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
          label={i18n('entities.broker.fields.top_broker')}
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
  );
}

export default BrokerBaseForm;
