import { Helmet } from 'react-helmet';
import config from 'src/config';
import PropTypes from 'prop-types';

function Meta({ title, keywords, description }) {
  return (
    <Helmet>
      <title>
        {[title, config.frontendUrl.host]
          .filter(Boolean)
          .join(' | ')}
      </title>
      {Boolean(keywords && keywords.length) && (
        <meta
          name="keywords"
          content={keywords.join(', ')}
        />
      )}
      {Boolean(description) && (
        <meta name="description" content={description} />
      )}
      <meta
        name="google-site-verification"
        content="I_jL14WylpufCX7gSmoJDN2qui2xvtoL0UvpB4oV0_A"
      />
      <meta name="robots" content="index,follow" />
    </Helmet>
  );
}

Meta.defaultProps = {
  keywords: null,
  description: null,
};

Meta.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
};

export default Meta;
