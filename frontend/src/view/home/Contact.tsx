import { Grid } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
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
import HtmlEditorFormItem from 'src/view/shared/form/items/HtmlEditorFormItem';
import { useDispatch, useSelector } from 'react-redux';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import Layout from 'src/view/home/Layout';
import PageContent from 'src/view/shared/view/PageContent';
import MDTypography from 'src/mui/components/MDTypography';

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
                  <HtmlEditorFormItem name="content" />
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
                  {i18n('common.send')}
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
