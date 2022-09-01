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
          label={i18n(
            'entities.broker.fields.demo_account',
          )}
          groupInputTemplates={[
            {
              input: SelectFormItem,
              name: 'type',
              label: i18n(
                'entities.broker.fields.upside.type',
              ),
              xs: 6,
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
              xs: 6,
              defaultValue: '',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}

export default BrokerOverviewForm;
