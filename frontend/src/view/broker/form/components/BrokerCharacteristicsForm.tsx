import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';

function BrokerCharacteristicsForm(props) {
  const { record } = props;
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <InputFormItem
          name="homepage"
          label={i18n('entities.broker.fields.homepage')}
          variant="standard"
          required
        />
      </Grid>
      <Grid item xs={12}>
        <InputFormItem
          name="phone"
          label={i18n('entities.broker.fields.phone')}
          variant="standard"
          required
        />
      </Grid>
    </Grid>
  );
}

export default BrokerCharacteristicsForm;
