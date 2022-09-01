import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import brokerEnumerators from 'src/modules/broker/brokerEnumerators';
import GroupFormItem from 'src/view/shared/form/items/GroupFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

function BrokerOverviewForm(props) {
  const { record } = props;
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <HtmlEditorFormItem
          name="teaser"
          label={i18n('entities.broker.fields.teaser')}
          value={record.meta.teaser}
        />
      </Grid>
      <Grid item xs={12}>
        <GroupFormItem
          name="upsides"
          label={i18n('entities.broker.fields.upsides')}
          groupInputTemplates={[
            {
              input: SelectFormItem,
              name: 'type',
              label: i18n(
                'entities.broker.fields.upside.type',
              ),
              md: 6,
              xs: 12,
              defaultValue: '',
              options: brokerEnumerators.upside.type.map(
                (value) => ({
                  value,
                  label: i18n(
                    `entities.broker.enumerators.upside.type.${value}`,
                  ),
                }),
              ),
            },
            {
              input: InputFormItem,
              name: 'text',
              label: i18n(
                'entities.broker.fields.upside.text',
              ),
              md: 6,
              xs: 12,
              defaultValue: '',
              required: true,
            },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <GroupFormItem
          name="regulatory_authorities"
          label={i18n(
            'entities.broker.fields.regulatory_authorities',
          )}
          groupInputTemplates={[
            {
              input: InputFormItem,
              name: 'name',
              label: i18n(
                'entities.broker.fields.regulatory_authority.name',
              ),
              md: 6,
              xs: 12,
              defaultValue: '',
              required: true,
            },
            {
              input: InputFormItem,
              name: 'abbreviation',
              label: i18n(
                'entities.broker.fields.regulatory_authority.abbreviation',
              ),
              md: 6,
              xs: 12,
              defaultValue: '',
              required: true,
            },
            {
              input: InputFormItem,
              name: 'url',
              label: i18n(
                'entities.broker.fields.regulatory_authority.url',
              ),
              xs: 12,
              defaultValue: '',
              required: true,
            },
          ]}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <SelectFormItem
          name="broker_type"
          label={i18n('entities.broker.fields.broker_type')}
          options={brokerEnumerators.meta.broker_type.map(
            (value) => ({
              value,
              label: i18n(
                `entities.broker.enumerators.meta.broker_type.${value}`,
              ),
            }),
          )}
          variant="standard"
        />
      </Grid>
    </Grid>
  );
}

export default BrokerOverviewForm;
