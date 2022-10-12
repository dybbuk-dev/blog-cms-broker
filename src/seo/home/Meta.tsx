import { getConfig } from '../../config';
import PropTypes from 'prop-types';
import React from 'react';

function Meta({ title, keywords, description, author }) {
  return (
    <>
      <meta charSet="utf-8" />
      <title>
        {[title, getConfig().FRONTEND_HOST]
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
        content="YeSUBnOtUX8EGYSKrwgVVgVU6myTY5UPLOrY6PdE464"
      />
      <meta name="robots" content="index,follow" />
      {Boolean(author) && (
        <link href={author.link} rel="author" />
      )}
    </>
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
  author: PropTypes.object,
};

export default Meta;
