import React from 'react';

import Footer from '../components/Footer';
import Header from '../components/Header';

const Layout: React.FC = function(props) {
  const { children } = props;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
