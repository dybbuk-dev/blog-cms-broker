import { Grid, InputAdornment } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';

function BrokerCharacteristicsForm(props) {
  const { darkMode } = selectMuiSettings();
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
        <FieldSetViewItem
          label={i18n('entities.broker.fields.addresses')}
        >
          <Grid spacing={2} container>
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
        </FieldSetViewItem>
      </Grid>
      <Grid item xs={12}>
        <HtmlEditorFormItem
          name="description"
          label={i18n('entities.broker.fields.description')}
        />
      </Grid>
      <Grid item xs={12}>
        <FieldSetViewItem
          description={i18n(
            'entities.broker.fields.youtube_hash_description',
          )}
          label={i18n('entities.broker.fields.video')}
        >
          <InputFormItem
            name="youtube_hash"
            label={i18n(
              'entities.broker.fields.youtube_hash',
            )}
            variant="standard"
            startAdornment={
              <InputAdornment
                position="start"
                sx={{
                  color:
                    (darkMode ? 'white' : 'inherit') +
                    ' !important',
                }}
              >
                <span>
                  {i18n(
                    'entities.broker.fields.youtube_hash_prefix',
                  )}
                </span>
              </InputAdornment>
            }
          />
        </FieldSetViewItem>
      </Grid>
    </Grid>
  );
}

export default BrokerCharacteristicsForm;
