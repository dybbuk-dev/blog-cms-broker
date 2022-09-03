import $ from 'jquery';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDEditor from 'src/mui/components/MDEditor';
import MDTypography from 'src/mui/components/MDTypography';
import FormErrors from 'src/view/shared/form/formErrors';

interface HtmlEditorFormItemProps {
  name: string;
  label: string;
  value?: string;
  required?: boolean;
  externalErrorMessage?: string;
}

function HtmlEditorFormItem({
  name,
  label,
  value,
  required,
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
    formValue || defaultValues[name] || '',
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

      <MDEditor
        value={originalValue}
        onChange={onChangeEditor}
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        formats={[
          'bold',
          'italic',
          'underline',
          'strike',
          'list',
          'bullet',
          'link',
          'image',
        ]}
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
};

export default HtmlEditorFormItem;
