import { Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import UndoIcon from '@mui/icons-material/Undo';
import { useState } from 'react';
import { i18n } from 'src/i18n';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import newsEnumerators from '../../../modules/news/newsEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import NewsAutocompleteFormItem from 'src/view/news/autocomplete/NewsAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

const schema = yup.object().shape({
  link: yupFormSchemas.string(
    i18n('entities.news.fields.link'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  meta_keywords: yupFormSchemas.string(
    i18n('entities.news.fields.meta_keywords'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  meta_description: yupFormSchemas.string(
    i18n('entities.news.fields.meta_description'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  name: yupFormSchemas.string(
    i18n('entities.news.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  title: yupFormSchemas.string(
    i18n('entities.news.fields.title'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  teaser: yupFormSchemas.string(
    i18n('entities.news.fields.teaser'),
    {},
  ),
  teaser_upload: yupFormSchemas.string(
    i18n('entities.news.fields.teaser_upload'),
    {},
  ),
  teaser_link: yupFormSchemas.string(
    i18n('entites.news.fields.teaser_link'),
    {},
  ),
  teaser_title: yupFormSchemas.string(
    i18n('entites.news.fields.teaser_title'),
    {},
  ),
  body: yupFormSchemas.string(
    i18n('entities.news.fields.body'),
    {
      required: true,
    },
  ),
  target: yupFormSchemas.enumerator(
    i18n('entities.news.fields.target'),
    {
      options: newsEnumerators.target,
    },
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.news.fields.activated'),
    {},
  ),
  pdf: yupFormSchemas.boolean(
    i18n('entities.news.fields.pdf'),
    {},
  ),
  frontpage: yupFormSchemas.boolean(
    i18n('entities.news.fields.frontpage'),
    {},
  ),
});

function NewsForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      link: record.link,
      meta_keywords: record.meta_keywords,
      meta_description: record.meta_description,
      name: record.name,
      title: record.title,
      teaser: record.teaser,
      teaser_upload: record.teaser_upload,
      teaser_link: record.teaser_link,
      teaser_title: record.teaser_title,
      body: record.body,
      target: record.target,
      sort: record.sort ?? 0,
      activated: record.activated,
      pdf: record.pdf,
      frontpage: record.frontpage,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const onSubmit = (values) => {
    props.onSubmit(props.record?.id, values);
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key) => {
      form.setValue(key, initialValues[key]);
    });
  };

  const { saveLoading, modal } = props;

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MDBox
            pb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h4">
              {'meta data'}
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            <Grid spacing={2} container>
              <Grid item md={12} xs={12}>
                <InputFormItem
                  name="link"
                  label={i18n('entities.news.fields.link')}
                  variant="standard"
                  required={true}
                  autoFocus
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <InputFormItem
                  name="title"
                  label={i18n('entities.news.fields.title')}
                  variant="standard"
                  required={true}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <InputFormItem
                  name="meta_keywords"
                  label={i18n(
                    'entities.news.fields.meta_keywords',
                  )}
                  variant="standard"
                  required={true}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <InputFormItem
                  name="meta_description"
                  label={i18n(
                    'entities.news.fields.meta_description',
                  )}
                  variant="standard"
                  required={true}
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox
            pb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h4">
              {'teasers'}
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            <Grid spacing={2} container>
              <Grid item md={12} xs={12}>
                <InputFormItem
                  name="teaser_upload"
                  label={i18n(
                    'entities.news.fields.teaser_upload',
                  )}
                  variant="standard"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <InputFormItem
                  name="teaser_link"
                  label={i18n(
                    'entities.news.fields.teaser_link',
                  )}
                  variant="standard"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <InputFormItem
                  name="teaser_title"
                  label={i18n(
                    'entities.news.fields.teaser_title',
                  )}
                  variant="standard"
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <HtmlEditorFormItem
                  name="teaser"
                  label={i18n(
                    'entities.news.fields.teaser',
                  )}
                  value={initialValues.teaser}
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox
            pb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h4">
              {'pages content'}
            </MDTypography>
          </MDBox>
          <MDBox p={3}>
            <Grid spacing={2} container>
              <Grid item md={12} xs={12}>
                <InputFormItem
                  name="name"
                  label={i18n('entities.news.fields.name')}
                  variant="standard"
                  required={true}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <HtmlEditorFormItem
                  name="body"
                  label={i18n('entities.news.fields.body')}
                  value={initialValues.body}
                  required={true}
                />
              </Grid>
            </Grid>
          </MDBox>
          <Grid spacing={2} container>
            <Grid item md={4} xs={12}>
              <CheckboxFormItem
                name="activated"
                label={i18n(
                  'entities.news.fields.activated',
                )}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <CheckboxFormItem
                name="pdf"
                label={i18n('entities.news.fields.pdf')}
              />
            </Grid>
          </Grid>
          <FormButtons
            style={{
              flexDirection: modal
                ? 'row-reverse'
                : undefined,
            }}
          >
            <MDButton
              variant="gradient"
              color={sidenavColor}
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </MDButton>

            <MDButton
              variant="outlined"
              color={sidenavColor}
              disabled={saveLoading}
              onClick={onReset}
              type="button"
              startIcon={<UndoIcon />}
              size="small"
            >
              {i18n('common.reset')}
            </MDButton>

            {props.onCancel ? (
              <MDButton
                variant="outlined"
                color={sidenavColor}
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                type="button"
                startIcon={<CloseIcon />}
                size="small"
              >
                {i18n('common.cancel')}
              </MDButton>
            ) : null}
          </FormButtons>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default NewsForm;
