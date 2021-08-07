import { GetStaticProps } from 'next';
import React from 'react';

import Project from '../components/Project';
import SEO from '../components/SEO';
import { Section, SectionHeading } from '../components/styled';
import Layout from '../layouts/Layout';
import { getAllProjects } from '../lib/api';

interface ProjectProps {
  projects: GraphQL.Project[];
}

const ProjectsPage: React.FC<ProjectProps> = function(props) {
  const { projects } = props;

  return (
    <Layout>
      <SEO title="Projects" />
      <Section>
        <SectionHeading>All Projects</SectionHeading>
        {/* list all projects */}
        {projects.map((project, index) => (
          <Project
            key={project.id}
            project={{
              title: project.name,
              description: project.description || '',
              url: project.url,
            }}
            index={index}
          />
        ))}
      </Section>
    </Layout>
  );
};

export default ProjectsPage;

export const getStaticProps: GetStaticProps<ProjectProps> = async () => {
  const githubContent = await getAllProjects();
  return {
    props: githubContent,
  };
};
