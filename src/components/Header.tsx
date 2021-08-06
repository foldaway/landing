import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;

  width: 100%;
`;

interface Props {
  title: string;
}

const Header: React.FC<Props> = function(props) {
  const { title } = props;

  return (
    <Wrapper>
      <span>{title}</span>
    </Wrapper>
  );
};

export default Header;
