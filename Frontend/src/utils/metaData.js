import React from 'react';
import { Helmet } from 'react-helmet';

function MetaData({ title, description }) {
  return (
    <Helmet>
      <title>{`${title} - Burpp`}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="food, cheap price, save food, restaurants, Burpp"
      />
    </Helmet>
  );
}

export default MetaData;
