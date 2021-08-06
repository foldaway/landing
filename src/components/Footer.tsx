import React from 'react';
import styled from 'styled-components';

import config from '../config';

const Wrapper = styled.footer`
  border-top: 1px solid ${props => props.theme.colors.primary};
  text-align: center;
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Footnote = styled.span`
  &:hover {
    font-family: 'Comic Sans MS';
  }
`;

const Copyright = styled.span`
  opacity: 0.7;
`;

const Footer: React.FC = function() {
  return (
    <Wrapper>
      <Footnote>Learning is fun.</Footnote>
      <Copyright>
        &copy; {new Date().getFullYear()} {config.siteMetadata.title}
      </Copyright>
    </Wrapper>
  );
};

export default Footer;
