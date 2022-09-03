import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import brokerEnumerators from 'src/modules/broker/brokerEnumerators';
import GroupFormItem from 'src/view/shared/form/items/GroupFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';

function BrokerOldForm(props) {
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <FieldSetViewItem
          label={i18n(
            'entities.broker.fields.minimum_trading_units',
          )}
        >
          <SelectFormItem
            name="minimum_trading_units"
            label={i18n(
              'entities.broker.fields.minimum_trading_units',
            )}
            options={brokerEnumerators.minimum_trading_unit.minimum_trading_unit.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.broker.enumerators.minimum_trading_unit.minimum_trading_unit.${value}`,
                ),
              }),
            )}
            variant="standard"
            mode="multiple"
          />
        </FieldSetViewItem>
      </Grid>
      <Grid item xs={12}>
        <GroupFormItem
          name="currency_pairs"
          label={i18n(
            'entities.broker.fields.currency_pairs',
          )}
          groupInputTemplates={[
            {
              input: InputFormItem,
              name: 'currency',
              label: i18n(
                'entities.broker.fields.currency_pair.currency',
              ),
              md: 6,
              xs: 12,
              defaultValue: '',
            },
            {
              input: InputFormItem,
              name: 'url',
              label: i18n(
                'entities.broker.fields.currency_pair.url',
              ),
              md: 6,
              xs: 12,
              defaultValue: '',
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}

export default BrokerOldForm;
