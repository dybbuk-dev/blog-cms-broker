import CookieConsent from 'react-cookie-consent';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import dBorders from 'src/mui/assets/theme-dark/base/borders';
import dBoxShadows from 'src/mui/assets/theme-dark/base/boxShadows';
import lBorders from 'src/mui/assets/theme/base/borders';
import lBoxShadows from 'src/mui/assets/theme/base/boxShadows';
import lightColors from 'src/mui/assets/theme/base/colors';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import MDBox from 'src/mui/components/MDBox';

function CookieConsentTool({ darkMode }) {
  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Datenschutz einstellen"
        declineButtonText={<CloseIcon />}
        cookieName="broker-consent-cookie"
        style={{
          left: 0,
          right: 'auto',
          bottom: 0,
          margin: '16px',
          width: 'auto',
          background: darkMode
            ? darkColors.dark.main
            : lightColors.white.main,
          color: 'inherit',
          boxShadow: darkMode
            ? dBoxShadows.lg
            : lBoxShadows.lg,
          borderRadius: darkMode
            ? dBorders.borderRadius.md
            : lBorders.borderRadius.md,
          fontSize: '1rem',
          display: 'block',
          textAlign: 'center',
        }}
        buttonStyle={{
          background: darkMode
            ? darkColors.info.main
            : lightColors.info.main,
          color: 'white',
          fontSize: '1rem',
          borderRadius: darkMode
            ? dBorders.borderRadius.sm
            : lBorders.borderRadius.sm,
        }}
        declineButtonStyle={{
          background: 'transparent',
          position: 'absolute',
          top: '4px',
          right: '4px',
          margin: 0,
          color: 'inherit',
          padding: 0,
          display: 'flex',
          width: '16px',
          height: '16px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        contentStyle={{
          margin: '24px 16px 0 16px',
        }}
        expires={150}
        enableDeclineButton
      >
        Wir kennen Ihre Datenschutz Präferenzen noch nicht.
      </CookieConsent>
    </>
  );
}

CookieConsentTool.defaultProps = {
  darkMode: false,
};

CookieConsentTool.propTypes = {
  darkMode: PropTypes.bool,
};

export default CookieConsentTool;
