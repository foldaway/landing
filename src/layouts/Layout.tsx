import React from 'react';

import Header from '../components/Header';
import config from '../config';

const Layout: React.FC = function(props) {
  const { children } = props;

  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>
        &copy; {new Date().getFullYear()} {config.siteMetadata.title}
      </footer>
    </>
  );
};

export default Layout;
