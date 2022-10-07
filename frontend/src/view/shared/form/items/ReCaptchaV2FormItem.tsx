import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import config from 'src/config';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

function ReCaptchaV2FormItem(props) {
  const { externalErrorMessage, name } = props;

  const {
    errors,
    formState: { touched, isSubmitted },
    register,
    setValue,
  } = useFormContext();

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  return (
    <>
      <MDBox
        display="flex"
        justifyContent="center"
        width="100%"
      >
        <ReCAPTCHA
          sitekey={config.reCaptchaSiteKey}
          onChange={(value) => {
            setValue(name, value, {
              shouldValidate: false,
              shouldDirty: true,
            });
          }}
        />
      </MDBox>
      {errorMessage && (
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
            textAlign="center"
          >
            {errorMessage}
          </MDTypography>
        </MDBox>
      )}
    </>
  );
}

ReCaptchaV2FormItem.defaultProps = {
  name: 'recaptcha',
};

ReCaptchaV2FormItem.propTypes = {
  externalErrorMessage: PropTypes.string,
  name: PropTypes.string,
};

export default ReCaptchaV2FormItem;
