import React from 'react';
import styled from 'styled-components';

import { device } from '../../constants';
import MenuChild from './components/MenuChild';
import NavListItem from './components/NavListItem';
import { MenuItem } from './types';

interface NavWrapperProps {
  hideMenu?: boolean;
}
const Wrapper = styled.nav<NavWrapperProps>`
  display: flex;
  flex-flow: column-reverse;
  justify-content: flex-start;

  margin-left: 0;
  flex: 1 0 100%;
  max-height: 0;
  overflow: hidden;
  transition: max-height cubic-bezier(0.4, 0, 0.2, 1) 0.25s;

  @media screen and ${device.laptop} {
    visibility: ${props => (props.hideMenu ? 'hidden' : 'initial')};
    margin-left: ${props => props.theme.paddings.halfpd}px;
    flex: 1;
    max-height: initial;
    overflow: initial;
    justify-content: space-between;
    align-items: center;
    flex-flow: row;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 0;

  & > ${NavListItem}:after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 5px;
    left: 50%;
    right: 50%;
    background-color: transparent;
    transition: all 0.5s;
  }
  & > ${NavListItem}:hover:after {
    background-color: ${props => props.theme.colors.accent};
    left: 30%;
    right: 30%;
    transition: all 0.5s;
  }
  & > ${NavListItem} a {
    padding: ${props => props.theme.paddings.halfpd}px;
  }

  & ${NavListItem} ${NavListItem} {
    padding: ${props => props.theme.paddings.halfpd * 0.25}px
      ${props => props.theme.paddings.halfpd}px;
  }

  @media screen and ${device.laptop} {
    align-items: center;
    flex-direction: row;

    & > ${NavListItem} a {
      padding: ${props => props.theme.paddings.halfpd}px 0.5rem;
    }

    & ${NavListItem} ${NavListItem} {
      padding: 0;
    }
  }
`;

interface Props {
  data: MenuItem[];
  hideMenu?: boolean;
}

const Nav: React.FC<Props> = function(props) {
  const { hideMenu, data } = props;

  return (
    <Wrapper hideMenu={hideMenu}>
      <NavList>
        {data.map((item: MenuItem, key: number) => (
          <MenuChild item={item} key={key} level={1} />
        ))}
      </NavList>
    </Wrapper>
  );
};

export default Nav;
