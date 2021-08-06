import React from 'react';

const SiteConfigurationContext = React.createContext<CMS.SiteConfiguration | null>(
  null
);

export default SiteConfigurationContext;
