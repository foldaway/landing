import { CmsConfig } from 'netlify-cms-core';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import React, { useLayoutEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import siteCSS from '!url-loader!../site.css';

import config from '../cms/config.yml';
import ErrorFallback from '../cms/ErrorFallback';
import SEO from '../components/SEO';
import StyleInjector from '../components/StyleInjector';

// This component provides all the context needed
const PreviewComponentWrapper: React.FC = function(props) {
  const { children } = props;

  const [pathname, setPathname] = useState('/');

  const mockRouter = {
    pathname,
    //eslint-disable-next-line
    prefetch: async () => {},
    push: async (newPathname: string) => {
      setPathname(newPathname);
    },
  };

  return (
    <StyleInjector>
      {
        //@ts-ignore
        <RouterContext.Provider value={mockRouter}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
          </ErrorBoundary>
        </RouterContext.Provider>
      }
    </StyleInjector>
  );
};

const NetlifyCMSPage: React.FC = function() {
  useLayoutEffect(() => {
    async function setup() {
      if (typeof window === 'undefined') {
        return;
      }

      const CMS = (await import('netlify-cms-app')).default;

      const configYML = config as CmsConfig;

      CMS.init({
        config: {
          ...configYML,
          backend: {
            ...configYML.backend,
            base_url: process.env.URL ?? 'http://localhost:3000',
          },
        },
      });

      CMS.registerPreviewStyle(siteCSS);
    }

    setup();
  }, []);

  return (
    <div>
      <SEO title={`${config} CMS`} />
    </div>
  );
};

export default NetlifyCMSPage;
