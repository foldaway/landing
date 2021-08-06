import '../site.css';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../theme';

const App: React.FC<AppProps> = function(props) {
  const { Component, pageProps } = props;

  return (
    <ThemeProvider theme={theme()}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
