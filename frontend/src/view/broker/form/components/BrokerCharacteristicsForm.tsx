import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';

function BrokerCharacteristicsForm(props) {
  const { record } = props;
  return (
    <Grid spacing={2} container>
      <Grid item md={6} xs={12}>
        <InputFormItem
          name="homepage"
          label={i18n('entities.broker.fields.homepage')}
          variant="standard"
          required
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <InputFormItem
          name="email"
          label={i18n('entities.broker.fields.email')}
          variant="standard"
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <InputFormItem
          name="phone"
          label={i18n('entities.broker.fields.phone')}
          variant="standard"
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <InputFormItem
          name="fax"
          label={i18n('entities.broker.fields.fax')}
          variant="standard"
        />
      </Grid>
    </Grid>
  );
}

export default BrokerCharacteristicsForm;
