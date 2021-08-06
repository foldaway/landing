import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Logo } from '../assets/images/logo.svg';
import Link from './Link';

const Wrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  padding: 30px 0 20px;
  border-bottom: 1px solid ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.secondary};
  font-style: italic;

  @media (max-width: ${props => props.theme.breakMedium}) {
    display: block;
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  font-size: 28px;
  text-decoration: none;
  color: ${props => props.theme.colors.primary};

  &:visited {
    color: ${props => props.theme.colors.primary};
  }

  &:hover {
    opacity: 0.5;
  }
`;

const StyledLogo = styled(Logo)`
  width: 200px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 5rem;

  @media (max-width: ${props => props.theme.breakMedium}) {
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
  }
`;

const Header: React.FC = function() {
  return (
    <Wrapper>
      <Link href="/">
        <StyledLogo />
      </Link>
      <Nav>
        <StyledLink href="/projects">Projects</StyledLink>
        <StyledLink href="/#people">People</StyledLink>
        <StyledLink href="/#about">About</StyledLink>
      </Nav>
    </Wrapper>
  );
};

export default Header;
