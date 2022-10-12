import React from 'react';
import Meta from './Meta';
import PropTypes from 'prop-types';

function Layout({
  title,
  keywords,
  description,
  author,
  children,
}) {
  return (
    <>
      <html>
        <head>
          <Meta
            title={title}
            keywords={keywords}
            description={description}
            author={author}
          />
        </head>
        <body>{children}</body>
      </html>
    </>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  author: PropTypes.any,
  children: PropTypes.any,
};

export default Layout;
