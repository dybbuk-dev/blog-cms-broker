import { getConfig } from '../../config';
import PropTypes from 'prop-types';
import React from 'react';

function Meta({
  title,
  keywords,
  description,
  author,
  url,
  noIndex,
}) {
  return (
    <>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=yes"
      />
      <meta
        httpEquiv="Content-Type"
        content="text/html; charset=utf-8"
      />
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
      {Boolean(noIndex) && (
        <meta name="robots" content="noindex" />
      )}
      {Boolean(noIndex) && (
        <meta name="googlebot" content="noindex" />
      )}
      {!noIndex && (
        <meta name="robots" content="index,follow" />
      )}
      {Boolean(author) && (
        <link href={author.link} rel="author" />
      )}
      {Boolean(url) && <link rel="canonical" href={url} />}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          name: 'Broker Bewertungen',
          alternateName: 'Broker-Bewertungen',
          url: 'https://broker-bewertungen.de',
        })}
      </script>
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
  url: PropTypes.string,
  noIndex: PropTypes.bool,
};

export default Meta;
