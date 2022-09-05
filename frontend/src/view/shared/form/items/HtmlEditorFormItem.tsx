import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import $ from 'jquery';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

import { CKEditor } from 'ckeditor4-react';

interface HtmlEditorFormItemProps {
  name: string;
  label: string;
  value?: string;
  required?: boolean;
  height: number;
  externalErrorMessage?: string;
}

function HtmlEditorFormItem({
  name,
  label,
  value,
  required,
  height,
  externalErrorMessage,
}: HtmlEditorFormItemProps) {
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

  const onChangeEditor = (newVal) => {
    const isEmpty = $(newVal).text().trim() === '';
    updateValue(isEmpty ? '' : newVal);
  };

  return (
    <MDBox
      pt={2}
      sx={{
        position: 'relative',
      }}
    >
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
      <CKEditor
        initData={originalValue}
        config={{
          extraPlugins: ['image2', 'uploadimage'],
          removePlugins: ['resize'],
          height,
          autoGrow_onStartup: true,
          resize_enabled: false,
          // filebrowserBrowseUrl: '/browser/browse.php',
          // filebrowserUploadUrl: '/uploader/upload.php'
        }}
        onChange={(param) => {
          onChangeEditor(param.editor?.getData());
        }}
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
