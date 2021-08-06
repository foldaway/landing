import styled from 'styled-components';

import Link from './Link';

export const Section = styled.div`
  margin-bottom: 100px;
`;

export const SectionHeading = styled.h1`
  font-family: ${props => props.theme.secondary};
  font-style: italic;
  font-size: 36px;
  font-weight: 400;
  line-height: 1;
  margin: 0 0 8px;
`;

export const SeeMore = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px 0;
  font-weight: 500;
  font-size: 48px;
  line-height: 1;
  letter-spacing: -0.04em;
  text-decoration: none;
  color: ${props => props.theme.colors.primary};

  &:visited {
    color: ${props => props.theme.colors.primary};
  }

  &:hover {
    text-decoration: underline;
  }
`;
