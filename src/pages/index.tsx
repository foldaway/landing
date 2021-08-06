import { GetStaticProps } from 'next';
import React from 'react';

import CMSContextWrapper, {
  CMSContextWrapperProps,
} from '../cms/CMSContextWrapper';
import { readCMSContextWrapperProps } from '../cms/util';
import Project from '../components/Project';
import SEO from '../components/SEO';
import { Section, SectionHeading, SeeMore } from '../components/styled';
import Layout from '../layouts/Layout';

const HomePage: React.FC<CMSContextWrapperProps> = function(props) {
  return (
    <CMSContextWrapper {...props}>
      <Layout>
        <SEO title="Fourth Class Honours" />
        <Section>
          <SectionHeading>Featured Projects</SectionHeading>
          <Project
            project={{
              title: 'sg-scraper',
              description:
                'Vitae consectetur mauris non dictum felis ridiculus',
              url: 'https://github.com/fourthclasshonours/sg-scraper',
            }}
            index={1}
          />
          <Project
            project={{
              title: 'sg-scraper',
              description:
                'Vitae consectetur mauris non dictum felis ridiculus',
              url: 'https://github.com/fourthclasshonours/sg-scraper',
            }}
            index={2}
          />
          <Project
            project={{
              title: 'sg-scraper',
              description:
                'Vitae consectetur mauris non dictum felis ridiculus',
              url: 'https://github.com/fourthclasshonours/sg-scraper',
            }}
            index={3}
          />
          {/* showcase pinned repos */}
          <SeeMore href="/projects">↙see more projects</SeeMore>
        </Section>
        <Section>
          <SectionHeading>People</SectionHeading>
          {/* list members */}
        </Section>
        <Section>
          <SectionHeading>About</SectionHeading>
        </Section>
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
