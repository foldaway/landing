import React from 'react';

import SEO from '../components/SEO';
import Layout from '../layouts/Layout';

const ProjectsPage: React.FC = function() {
  return (
    <Layout>
      <SEO title="Projects" />
      <h1>Projects</h1>
      {/* list all projects */}
    </Layout>
  );
};

export default ProjectsPage;
