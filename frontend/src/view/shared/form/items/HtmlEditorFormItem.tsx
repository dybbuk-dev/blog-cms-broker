import { AuthToken } from 'src/modules/auth/authToken';
import { CKEditor } from 'ckeditor4-react';
import { getLanguageCode } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';
import config from 'src/config';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

interface HtmlEditorFormItemProps {
  name: string;
  label?: string;
  value?: string;
  required?: boolean;
  height: number;
  externalErrorMessage?: string;
  toolbars?: {
    name: string;
    groups?: string[];
  }[];
}

function HtmlEditorFormItem({
  name,
  label,
  value,
  required,
  height,
  externalErrorMessage,
  toolbars,
}: HtmlEditorFormItemProps) {
  const token = AuthToken.get();

  const ckeditorConfig: any = {
    extraPlugins: [
      'image2',
      'uploadimage',
      'colorbutton',
      'colordialog',
    ],
    height,
    resize_minHeight: height,
    resize_maxHeight: height * 2,
    filebrowserUploadUrl: [
      config.backendUrl,
      '/tenant/',
      AuthCurrentTenant.get(),
      '/file/ckeditor',
    ].join(''),
    fileTools_requestHeaders: {
      Authorization: `Bearer ${token}`,
      'Accept-Language': getLanguageCode(),
    },
  };

  if (toolbars) {
    ckeditorConfig.toolbarGroups = toolbars;
  }

  const {
    setValue,
    errors,
    formState: { touched, isSubmitted },
    control: { defaultValuesRef },
    register,
    getValues,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = getValues(name);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const { darkMode } = selectMuiSettings();

  const [originalValue, setOriginalValue] = useState(
    formValue || value || defaultValues[name] || '',
  );

  const updateValue = (value) => {
    setOriginalValue(value);
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    register({ name });
    // updateValue(value || originalValue);
  }, [register, name]);

  const onChangeEditor = (evt) => {
    updateValue(evt.editor?.getData());
  };

  return (
    <MDBox pt={Boolean(label) ? 2 : 0} position="relative">
      {Boolean(label) && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          sx={{
            lineHeight: 1,
            position: 'absolute',
            top: 0,
          }}
        >
          {`${label}${required ? ' *' : ''}`}
        </MDTypography>
      )}
      <CKEditor
        initData={originalValue}
        config={ckeditorConfig}
        onChange={onChangeEditor}
      />
      {errorMessage && (
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errorMessage}
          </MDTypography>
        </MDBox>
      )}
    </MDBox>
  );
}

HtmlEditorFormItem.defaultProps = {
  value: '',
  required: false,
  height: 300,
};

export default HtmlEditorFormItem;
