import { Card, Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';

function BrokerCharacteristicsForm(props) {
  const { record } = props;
  return (
    <Grid spacing={2} container>
      <Grid item md={6} xs={12}>
        <Grid spacing={2} container>
          <Grid item xs={12}>
            <InputFormItem
              name="homepage"
              label={i18n(
                'entities.broker.fields.homepage',
              )}
              variant="standard"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <InputFormItem
              name="phone"
              label={i18n('entities.broker.fields.phone')}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <InputFormItem
              name="fax"
              label={i18n('entities.broker.fields.fax')}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <InputFormItem
              name="email"
              label={i18n('entities.broker.fields.email')}
              variant="standard"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <Card>
          <MDBox p={3}>
            <Grid spacing={2} container>
              <Grid item xs={12}>
                <MDTypography
                  variant="h5"
                  color="text"
                  textTransform="capitalize"
                >
                  {i18n('entities.broker.fields.addresses')}
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="address_line_0"
                  label={i18n(
                    'entities.broker.fields.address.line_0',
                  )}
                  variant="standard"
                  value={record.address.line_0}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="address_line_1"
                  label={i18n(
                    'entities.broker.fields.address.line_1',
                  )}
                  variant="standard"
                  value={record.address.line_1}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="address_line_2"
                  label={i18n(
                    'entities.broker.fields.address.line_2',
                  )}
                  variant="standard"
                  value={record.address.line_2}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="address_line_3"
                  label={i18n(
                    'entities.broker.fields.address.line_3',
                  )}
                  variant="standard"
                  value={record.address.line_3}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="address_line_4"
                  label={i18n(
                    'entities.broker.fields.address.line_4',
                  )}
                  variant="standard"
                  value={record.address.line_4}
                />
              </Grid>
              <Grid item xs={12}>
                <InputFormItem
                  name="address_line_5"
                  label={i18n(
                    'entities.broker.fields.address.line_5',
                  )}
                  variant="standard"
                  value={record.address.line_5}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <HtmlEditorFormItem
          name="description"
          label={i18n('entities.broker.fields.description')}
        />
      </Grid>
    </Grid>
  );
}

export default BrokerCharacteristicsForm;
