import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import HtmlView from 'src/view/shared/view/HtmlView';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ImageView from 'src/view/home/ImageView';

function BrokerOverviewView({ record }) {
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <HtmlView value={record.meta?.teaser} />
      </Grid>
      <Grid md={6} xs={12} item>
        <MDTypography variant="h4" mt={2}>
          {i18n('entities.broker.text.upsides')}
        </MDTypography>
        {(record.upsides || []).map((upside) => (
          <MDBox
            key={upside.id}
            position="relative"
            my={1}
            pl={3}
          >
            <MDBox
              display="inline"
              position="absolute"
              left={0}
              top={0}
            >
              {upside.type === 'UPSIDE' ? (
                <AddCircleIcon color="success" />
              ) : (
                <RemoveCircleIcon color="secondary" />
              )}
            </MDBox>
            <MDTypography
              variant="body1"
              fontWeight="regular"
              lineHeight="1.25"
            >
              {upside.text}
            </MDTypography>
          </MDBox>
        ))}

        <MDTypography variant="h4" mt={2}>
          {i18n('entities.broker.fields.minimum_deposit')}
        </MDTypography>
        <MDTypography
          variant="body2"
          fontWeight="regular"
          lineHeight="1.25"
          position="relative"
          my={1}
          pl={3}
        >
          {record.meta?.minimum_deposit}
        </MDTypography>

        <MDTypography variant="h4" mt={2}>
          {i18n('entities.broker.fields.scalping_allowed')}
        </MDTypography>
        <MDBox position="relative" my={1} pl={3}>
          <CheckboxViewItem
            checked={record.meta?.scalping_allowed}
          />
        </MDBox>

        <MDTypography variant="h4" mt={2}>
          {i18n('entities.broker.fields.regulation')}
        </MDTypography>
        {(record.regulatory_authorities || []).map((v) => (
          <MDTypography
            key={v.id}
            variant="body2"
            fontWeight="regular"
            lineHeight="1.25"
            position="relative"
            my={1}
            pl={3}
          >
            <MaterialLink
              href={v.url}
              target="_blank"
              underline="hover"
            >
              {v.name}
            </MaterialLink>
          </MDTypography>
        ))}

        <MDTypography variant="h4" mt={2}>
          {i18n(
            'entities.broker.fields.deposit_guarantees',
          )}
        </MDTypography>
        {(record.deposit_guarantees || []).map((v) => (
          <MDTypography
            key={v.id}
            variant="body2"
            fontWeight="regular"
            lineHeight="1.25"
            position="relative"
            my={1}
            pl={3}
          >
            <MaterialLink
              href={v.url}
              target="_blank"
              underline="hover"
            >
              {`${v.name} ${v.text}`}
            </MaterialLink>
          </MDTypography>
        ))}
      </Grid>
      <Grid md={6} xs={12} item>
        <MDTypography variant="h4" mt={2}>
          {i18n('entities.broker.fields.broker_type')}
        </MDTypography>
        <MDTypography
          variant="body2"
          fontWeight="regular"
          lineHeight="1.25"
          position="relative"
          my={1}
          pl={3}
        >
          {i18n(
            `entities.broker.enumerators.meta.broker_type.${record.meta?.broker_type}`,
          )}
        </MDTypography>

        <MDTypography variant="h4" mt={2}>
          {i18n('entities.broker.fields.certificates')}
        </MDTypography>
        <MDBox
          display="inline-flex"
          gap={1}
          position="relative"
          my={1}
          pl={3}
        >
          {(record.certificates || []).map((v) => (
            <MaterialLink
              key={v.id}
              href={v.url}
              target="_blank"
            >
              <ImageView value={v.image} />
            </MaterialLink>
          ))}
        </MDBox>

        <MDTypography variant="h4" mt={2}>
          {i18n('entities.broker.fields.spreads')}
        </MDTypography>
        {(record.spreads || [])
          .filter((v) => v.primary)
          .map((v) => (
            <MDTypography
              key={v.id}
              variant="body2"
              fontWeight="regular"
              lineHeight="1.25"
              position="relative"
              my={1}
              pl={3}
            >
              <MaterialLink
                href={v.url}
                target="_blank"
                underline="hover"
              >
                {`${v.spread}`}
              </MaterialLink>
            </MDTypography>
          ))}
      </Grid>
    </Grid>
  );
}

export default BrokerOverviewView;
