import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import brokerEnumerators from 'src/modules/broker/brokerEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

function BrokerPlatformForm(props) {
  const { record } = props;
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <SelectFormItem
          name="order_types"
          label={i18n('entities.broker.fields.order_types')}
          options={brokerEnumerators.order_type.type.map(
            (value) => ({
              value,
              label: i18n(
                `entities.broker.enumerators.order_type.type.${value}`,
              ),
            }),
          )}
          variant="standard"
          mode="multiple"
        />
      </Grid>
    </Grid>
  );
}

export default BrokerPlatformForm;
