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
  members: GraphQL.Member[];
  itemShowcase: GraphQL.Project[];
  description: string;
}

const HomePage: React.FC<IndexProps> = function(props) {
  const { itemShowcase, members, description } = props;
  return (
    <Layout>
      <SEO title="Fourth Class Honours" />
      <Section>
        <SectionHeading>Featured Projects</SectionHeading>
        {/* showcase pinned repos */}
        {itemShowcase.map((project, index) => (
          <Project key={project.id} project={project} index={index + 1} />
        ))}
        <SeeMore href="/projects">↙see more projects</SeeMore>
      </Section>
      <Section id="people">
        <SectionHeading>People</SectionHeading>
        {/* list members */}
        {members.map(member => (
          <Member key={member.login} member={member} />
        ))}
      </Section>
      {description && (
        <Section id="about">
          <SectionHeading>About</SectionHeading>
          {/* description from GitHub */}
          <SectionBody>{description}</SectionBody>
        </Section>
      )}
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
  const githubContent = await getHomePageContent();
  return {
    props: githubContent,
    revalidate: 60 * 60 * 24 * 7, // Revalidate once a week
  };
};
