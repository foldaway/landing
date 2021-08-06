import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;

  width: 100%;
  font-family: ${props => props.theme.secondary};
  font-style: italic;
`;

interface Props {
  title: string;
}

const Header: React.FC<Props> = function(props) {
  const { title } = props;

  return (
    <Wrapper>
      <img src="/logo.png" />
      <span>Projects</span>
      <span>People</span>
      <span>About</span>
    </Wrapper>
  );
};

export default Header;
