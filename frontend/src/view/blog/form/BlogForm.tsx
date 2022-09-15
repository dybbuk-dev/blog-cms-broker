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
import blogEnumerators from '../../../modules/blog/blogEnumerators';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import BlogAutocompleteFormItem from 'src/view/blog/autocomplete/BlogAutocompleteFormItem';
import CheckboxFormItem from 'src/view/shared/form/items/CheckboxFormItem';
import InputNumberFormItem from 'src/view/shared/form/items/InputNumberFormItem';
import NavigationAutocompleteFormItem from 'src/view/navigation/autocomplete/NavigationAutocompleteFormItem';
import TextAreaFormItem from 'src/view/shared/form/items/TextAreaFormItem';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';
import AuthorAutocompleteFormItem from 'src/view/author/autocomplete/AuthorAutocompleteFormItem';
import LogoFormItem from 'src/view/shared/form/items/LogoFormItem';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import Storage from 'src/security/storage';
import moment from 'moment';
import GroupFormItem from 'src/view/shared/form/items/GroupFormItem';
import BrokerAutocompleteFormItem from 'src/view/broker/autocomplete/BrokerAutocompleteFormItem';

const schema = yup.object().shape({
  link: yupFormSchemas.string(
    i18n('entities.blog.fields.link'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  metakeywords: yupFormSchemas.string(
    i18n('entities.blog.fields.metakeywords'),
    {
      min: 1,
      max: 255,
    },
  ),
  metadescription: yupFormSchemas.string(
    i18n('entities.blog.fields.metadescription'),
    {
      min: 1,
      max: 255,
    },
  ),
  name: yupFormSchemas.string(
    i18n('entities.blog.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  pagetitle: yupFormSchemas.string(
    i18n('entities.blog.fields.title'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  teaser: yupFormSchemas.string(
    i18n('entities.blog.fields.teaser'),
    {},
  ),
  content: yupFormSchemas.string(
    i18n('entities.blog.fields.content'),
    {
      required: true,
    },
  ),
  blog_image: yupFormSchemas.images(
    i18n('entities.blog.fields.blog_image'),
    {},
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.blog.fields.activated'),
    {},
  ),
});

function BlogForm(props) {
  const { sidenavColor } = selectMuiSettings();
  const [initialValues] = useState(() => {
    const record = props.record || {};

    return {
      link: record.link || null,
      pagetitle: record.pagetitle || null,
      meta_keywords: record.metakeywords || null,
      meta_description: record.metadescription || null,
      author: record.author,
      related_links: record.related_links,
      blog_image: record.blog_image || null,
      teaser: record.teaser || null,
      name: record.name,
      content: record.content,
      activated: record.activated,
      brokers: record.brokers,
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
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="name"
                variant="standard"
                label={i18n('entities.blog.fields.name')}
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="link"
                label={i18n('entities.blog.fields.link')}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <InputFormItem
                name="pagetitle"
                label={i18n(
                  'entities.blog.fields.pagetitle',
                )}
                variant="standard"
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextAreaFormItem
                name="metadescription"
                label={i18n(
                  'entities.blog.fields.metadescription',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextAreaFormItem
                name="metakeywords"
                label={i18n(
                  'entities.blog.fields.metakeywords',
                )}
                variant="standard"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <AuthorAutocompleteFormItem
                name="author"
                label={i18n('entities.blog.fields.author')}
                showCreate={true}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <LogoFormItem
                name="blog_image"
                label={i18n(
                  'entities.blog.fields.blog_image',
                )}
                storage={Storage.values.blog_image}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <HtmlEditorFormItem
                name="teaser"
                label={i18n('entities.news.fields.teaser')}
                value={initialValues.teaser}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <HtmlEditorFormItem
                name="content"
                label={i18n('entities.news.fields.content')}
                value={initialValues.content}
                required={true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <CheckboxFormItem
                name="activated"
                label={i18n(
                  'entities.blog.fields.activated',
                )}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <BrokerAutocompleteFormItem
                name="brokers"
                label={i18n('entities.blog.fields.brokers')}
                mode="multiple"
                showCreate={true}
                variant="standard"
                fullWidth
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

export default BlogForm;
