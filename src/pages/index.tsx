import { GetStaticProps } from 'next';
import React from 'react';

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
import { getHomePageContent } from '../lib/api';

interface IndexProps {
  members: CMS.Member[];
}

const HomePage: React.FC<IndexProps> = function(props) {
  const { members } = props;
  return (
    <Layout>
      <SEO title="Fourth Class Honours" />
      <Section>
        <SectionHeading>Featured Projects</SectionHeading>
        {/* showcase pinned repos */}
        <Project
          project={{
            title: 'sg-scraper',
            description: 'Vitae consectetur mauris non dictum felis ridiculus',
            url: 'https://github.com/fourthclasshonours/sg-scraper',
          }}
          index={1}
        />
        <Project
          project={{
            title: 'sg-scraper',
            description: 'Vitae consectetur mauris non dictum felis ridiculus',
            url: 'https://github.com/fourthclasshonours/sg-scraper',
          }}
          index={2}
        />
        <Project
          project={{
            title: 'sg-scraper',
            description: 'Vitae consectetur mauris non dictum felis ridiculus',
            url: 'https://github.com/fourthclasshonours/sg-scraper',
          }}
          index={3}
        />
        <SeeMore href="/projects">↙see more projects</SeeMore>
      </Section>
      <Section id="people">
        <SectionHeading>People</SectionHeading>
        {/* list members */}
        {members.map(member => (
          <Member
            key={member.login}
            member={{
              name: member.name,
              avatar: member.avatarUrl,
              url: member.url,
            }}
          />
        ))}
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
          interdum sed tristique turpis. Amet fames porta maecenas mauris vitae
          aenean habitant. Ac enim sit enim, nisi nec aliquet.
        </SectionBody>
      </Section>
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const githubContent = await getHomePageContent();
  return {
    props: githubContent,
  };
};
