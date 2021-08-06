import { GetStaticProps } from 'next';
import React from 'react';

import CMSContextWrapper, {
  CMSContextWrapperProps,
} from '../cms/CMSContextWrapper';
import { readCMSContextWrapperProps } from '../cms/util';
import Member from '../components/Member';
import Project from '../components/Project';
import SEO from '../components/SEO';
import {
  Section,
  SectionBody,
  SectionHeading,
  SeeMore,
} from '../components/styled';
import Layout from '../layouts/Layout';

const HomePage: React.FC<CMSContextWrapperProps> = function(props) {
  return (
    <CMSContextWrapper {...props}>
      <Layout>
        <SEO title="Fourth Class Honours" />
        <Section>
          <SectionHeading>Featured Projects</SectionHeading>
          {/* showcase pinned repos */}
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
          <SeeMore href="/projects">↙see more projects</SeeMore>
        </Section>
        <Section id="people">
          <SectionHeading>People</SectionHeading>
          {/* list members */}
          <Member
            member={{
              name: 'Ivan Tan',
              avatar: 'https://avatars.githubusercontent.com/u/12914099?v=4',
              url: 'https://github.com/ivantjh',
            }}
          />
          <Member
            member={{
              name: 'Ivan Tan',
              avatar: 'https://avatars.githubusercontent.com/u/12914099?v=4',
              url: 'https://github.com/ivantjh',
            }}
          />
          <Member
            member={{
              name: 'Ivan Tan',
              avatar: 'https://avatars.githubusercontent.com/u/12914099?v=4',
              url: 'https://github.com/ivantjh',
            }}
          />
        </Section>
        <Section id="about">
          <SectionHeading>About</SectionHeading>
          <SectionBody>
            Magna enim risus tincidunt pellentesque bibendum at non nibh. Rutrum
            non mauris commodo, eget est, feugiat sit mauris vitae. Velit sed
            augue luctus commodo.
          </SectionBody>
          <SectionBody>
            Felis in ultrices proin in ante turpis pellentesque. In egestas
            interdum sed tristique turpis. Amet fames porta maecenas mauris
            vitae aenean habitant. Ac enim sit enim, nisi nec aliquet.
          </SectionBody>
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
