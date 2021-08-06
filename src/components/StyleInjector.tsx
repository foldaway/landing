import React, { useEffect, useState } from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';

import theme from '../theme';

const StyleInjector: React.FC = function({ children }) {
  const [iframeRef, setIframeRef] = useState(null);

  useEffect(() => {
    const iframe = document.getElementsByTagName('iframe')[0];
    const iframeHeadElem = iframe?.contentDocument?.head;
    //@ts-ignore
    setIframeRef(iframeHeadElem);
  }, []);

  return (
    iframeRef && (
      //@ts-ignore
      <StyleSheetManager target={iframeRef}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StyleSheetManager>
    )
  );
};

export default StyleInjector;
