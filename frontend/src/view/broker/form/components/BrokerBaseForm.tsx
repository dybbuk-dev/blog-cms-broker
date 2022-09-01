import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import AuthorAutocompleteFormItem from 'src/view/author/autocomplete/AuthorAutocompleteFormItem';
import CategoryAutocompleteFormItem from 'src/view/category/autocomplete/CategoryAutocompleteFormItem';
import NavigationAutocompleteFormItem from 'src/view/navigation/autocomplete/NavigationAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';

function BrokerBaseForm(props) {
  const { record } = props;
  return (
    <Grid spacing={2} container>
      <Grid item xs={12} mb={3}>
        <Card>
          <MDBox p={3}>
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <MDTypography
                  variant="h5"
                  color="text"
                  textTransform="capitalize"
                >
                  {i18n('entities.broker.fields.metadata')}
                </MDTypography>
              </Grid>
              <Grid item md={6} xs={12}>
                <InputFormItem
                  name="demo_url"
                  label={i18n(
                    'entities.broker.fields.demo_url',
                  )}
                  variant="standard"
                  autoFocus
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputFormItem
                  name="account_url"
                  label={i18n(
                    'entities.broker.fields.account_url',
                  )}
                  variant="standard"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputFormItem
                  name="maximum_leverage"
                  label={i18n(
                    'entities.broker.fields.maximum_leverage',
                  )}
                  variant="standard"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <InputFormItem
                  name="minimum_deposit_short"
                  label={i18n(
                    'entities.broker.fields.minimum_deposit_short',
                  )}
                  variant="standard"
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <CheckboxFormItem
                  name="custodian_fees"
                  label={i18n(
                    'entities.broker.fields.custodian_fees',
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <CheckboxFormItem
                  name="mobile_trading"
                  label={i18n(
                    'entities.broker.fields.mobile_trading',
                  )}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <CheckboxFormItem
                  name="phone_order"
                  label={i18n(
                    'entities.broker.fields.phone_order',
                  )}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item md={6} xs={12}>
        <InputFormItem
          name="name"
          label={i18n('entities.broker.fields.name')}
          variant="standard"
          required={true}
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
      <Grid item xs={12}>
        <CategoryAutocompleteFormItem
          name="categories"
          label={i18n('entities.broker.fields.categories')}
          required={false}
          showCreate={true}
          variant="standard"
          mode="multiple"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <CategoryAutocompleteFormItem
          name="categories_in_top_lists"
          label={i18n(
            'entities.broker.fields.categories_in_top_lists',
          )}
          required={false}
          showCreate={true}
          variant="standard"
          mode="multiple"
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
      <Grid item xs={12}>
        <TextAreaFormItem
          name="homepage_impression"
          label={i18n(
            'entities.broker.fields.homepage_impression',
          )}
          variant="standard"
          fullWidth
        />
      </Grid>
    </Grid>
  );
}

export default BrokerBaseForm;
