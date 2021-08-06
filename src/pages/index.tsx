import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

import CMSContextWrapper, {
  CMSContextWrapperProps,
} from '../cms/CMSContextWrapper';
import { readCMSContextWrapperProps } from '../cms/util';
import SEO from '../components/SEO';
import Layout from '../layouts/Layout';

const HomePage: React.FC<CMSContextWrapperProps> = function(props) {
  return (
    <CMSContextWrapper {...props}>
      <Layout>
        <SEO title="Fourth Class Honours" />
        <h1>Featured Projects</h1>
        {/* showcase pinned repos */}
        <Link href="/projects">See more</Link>
        <h1>Members</h1>
        {/* list members */}
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
