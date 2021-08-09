import Head from 'next/head';
import React from 'react';
import { resolve } from 'url';

import config from '../config';

interface Props {
  lang?: string;
  description?: string;
  title: string;
}

const SEO: React.FC<Props> = function(props) {
  const { description, title } = props;
  const { siteMetadata } = config;

  const metaDescription = description || siteMetadata.description;

  const jsonLDSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fourth Class Honours',
    description: metaDescription,
    url: siteMetadata.siteUrl,
    logo: resolve(siteMetadata.siteUrl, 'og.png'),
  };

  return (
    <Head>
      <title>
        {title} | {siteMetadata.title}
      </title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={siteMetadata.title} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="og:image" content={resolve(siteMetadata.siteUrl, 'og.png')} />
      <meta name="og:url" content={siteMetadata.siteUrl} />
      <meta name="twitter:card" content={metaDescription} />
      <meta
        name="twitter:image"
        content={resolve(siteMetadata.siteUrl, 'og.png')}
      />
      <meta name="twitter:url" content={siteMetadata.siteUrl} />
      <meta name="twitter:title" content={siteMetadata.title} />
      <meta name="twitter:description" content={metaDescription} />
      <script type="application/ld+json">{JSON.stringify(jsonLDSchema)}</script>
    </Head>
  );
};

export default SEO;
