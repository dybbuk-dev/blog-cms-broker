import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import Storage from 'src/security/storage';
import ProductCategoryAutocompleteFormItem from 'src/view/productCategory/autocomplete/ProductCategoryAutocompleteFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';

function EditProductLayout(props) {
  const { initialValues } = props;
  return (
    <MDBox mt={3}>
      <Grid spacing={2} container>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <Card>
            <LogoFormItem
              name="logo"
              label={i18n('entities.product.fields.logo')}
              required={true}
              storage={Storage.values.productLogo}
              max={1}
            />
          </Card>
        </Grid>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Card>
            <MDBox px={3} py={3}>
              <Grid spacing={2} container>
                <Grid item xs={12}>
                  <MDTypography variant="h5">
                    Product Information
                  </MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="title"
                        label={i18n(
                          'entities.product.fields.title',
                        )}
                        variant="standard"
                        required={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <HtmlEditorFormItem
                        name="description"
                        label={i18n(
                          'entities.product.fields.description',
                        )}
                        value={initialValues.description}
                        required={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <ProductCategoryAutocompleteFormItem
                        name="category"
                        label={i18n(
                          'entities.product.fields.category',
                        )}
                        variant="standard"
                        fullWidth
                        required={true}
                        showCreate={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="website"
                        label={i18n(
                          'entities.product.fields.website',
                        )}
                        variant="standard"
                        required={true}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputFormItem
                        name="rating"
                        label={i18n(
                          'entities.product.fields.rating',
                        )}
                        variant="standard"
                        required={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputNumberFormItem
                        name="popularity"
                        label={i18n(
                          'entities.product.fields.popularity',
                        )}
                        variant="standard"
                        required={false}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default EditProductLayout;
