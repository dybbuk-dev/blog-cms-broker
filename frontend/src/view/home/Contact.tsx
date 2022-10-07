import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import Layout from 'src/view/home/Layout';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import PageContent from 'src/view/shared/view/PageContent';
import ReCaptchaV2FormItem from 'src/view/shared/form/items/ReCaptchaV2FormItem';
import SaveIcon from '@mui/icons-material/Save';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  name: yupFormSchemas.string(
    i18n('entities.contact.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  email: yupFormSchemas.email(
    i18n('entities.contact.fields.email'),
    {},
  ),
  subject: yupFormSchemas.string(
    i18n('entities.contact.fields.subject'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  recaptcha: yupFormSchemas.string(
    i18n('common.recaptcha'),
    { required: true },
  ),
});

function Contact() {
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const [initialValues] = useState(() => {
    return {
      name: '',
      email: '',
      subject: '',
      content: '',
      recaptcha: '',
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues as any,
  });

  const sendLoading = useSelector(
    authSelectors.selectLoadingContact,
  );

  const onSubmit = (values) => {
    dispatch(
      authActions.doSendContact(
        values.name,
        values.email,
        values.subject,
        values.content,
        values.recaptcha,
      ),
    );
  };

  return (
    <Layout>
      <PageContent>
        <MDTypography variant="h2">
          Kontakt zu broker-bewertungen.de aufnehmen
        </MDTypography>
        <MDTypography
          variant="body2"
          fontWeight="regular"
          my={3}
        >
          Um uns eine Nachricht zukommen zu lassen benutzen
          Sie bitte das Formular.
        </MDTypography>
        <MDTypography variant="h4" my={2}>
          Kontakt
        </MDTypography>
        <FormWrapper>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid spacing={2} container>
                <Grid item xs={12}>
                  <InputFormItem
                    name="name"
                    label={i18n(
                      'entities.contact.fields.name',
                    )}
                    variant="standard"
                    required={true}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputFormItem
                    name="email"
                    label={i18n(
                      'entities.contact.fields.email',
                    )}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputFormItem
                    name="subject"
                    label={i18n(
                      'entities.contact.fields.subject',
                    )}
                    variant="standard"
                    required={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <HtmlEditorFormItem
                    name="content"
                    toolbars={[
                      {
                        name: 'basicstyles',
                        groups: ['basicstyles'],
                      },
                      {
                        name: 'paragraph',
                        groups: ['list'],
                      },
                      { name: 'colors' },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} mb={2}>
                  <ReCaptchaV2FormItem />
                </Grid>
              </Grid>
              <FormButtons>
                <MDButton
                  variant="gradient"
                  color={sidenavColor}
                  disabled={sendLoading}
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  startIcon={<SaveIcon />}
                  size="small"
                >
                  Absenden
                </MDButton>
              </FormButtons>
            </form>
          </FormProvider>
        </FormWrapper>
      </PageContent>
    </Layout>
  );
}

export default Contact;
