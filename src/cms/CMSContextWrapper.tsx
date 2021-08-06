import React from 'react';

import SiteConfigurationContext from '../contexts/SiteConfigurationContext';

export interface CMSContextWrapperProps {
  siteConfiguration: CMS.SiteConfiguration;
}

const CMSContextWrapper: React.FC<CMSContextWrapperProps> = function(props) {
  const { children, siteConfiguration } = props;

  return (
    <SiteConfigurationContext.Provider value={siteConfiguration}>
      {children}
    </SiteConfigurationContext.Provider>
  );
};

export default CMSContextWrapper;
