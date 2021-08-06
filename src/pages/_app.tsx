import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/global-styles';
import theme from '../styles/theme';

const App: React.FC<AppProps> = function(props) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
