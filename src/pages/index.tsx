import { GetStaticProps } from 'next';
import React from 'react';

import CMSContextWrapper, {
  CMSContextWrapperProps,
} from '../cms/CMSContextWrapper';
import { readCMSContextWrapperProps } from '../cms/util';
import ComponentWithSVG from '../components/ComponentWithSVG';
import SEO from '../components/SEO';
import Layout from '../layouts/Layout';

const HomePage: React.FC<CMSContextWrapperProps> = function(props) {
  return (
    <CMSContextWrapper {...props}>
      <Layout>
        <SEO title="Fourth Class Honours" />
        <ComponentWithSVG />
        <div>Hello world!</div>
      </Layout>
    </CMSContextWrapper>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<CMSContextWrapperProps> = async () => {
  const cmsContextWrapperProps = readCMSContextWrapperProps();

  return {
    props: cmsContextWrapperProps,
  };
};
