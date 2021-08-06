import React from 'react';

import SEO from '../components/SEO';
import { Section, SectionHeading } from '../components/styled';
import Layout from '../layouts/Layout';

const ProjectsPage: React.FC = function() {
  return (
    <Layout>
      <SEO title="Projects" />
      <Section>
        <SectionHeading>All Projects</SectionHeading>
        {/* list all projects */}
      </Section>
    </Layout>
  );
};

export default ProjectsPage;
