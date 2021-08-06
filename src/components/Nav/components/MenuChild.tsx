import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as TriangleIcon } from '../../../assets/images/triangle.svg';
import Link from '../../Link';
import { MenuItem } from '../types';
import NavListItem from './NavListItem';
import NavSubList from './NavSubList';

const StyledTriangleIcon = styled(TriangleIcon)`
  transform: rotate(90deg);
  width: 16px;
  height: 16px;

  path {
    fill: ${props => props.theme.colors.accent};
  }
`;

const StyledLink = styled(Link)`
  padding: ${props => props.theme.paddings.halfpd * 0.25}px
    ${props => props.theme.paddings.halfpd}px;
  color: ${props => props.theme.colors.accent};
  text-decoration: none;
`;

interface Props {
  item: MenuItem;
  level: number;
}

const MenuChild: React.FC<Props> = props => {
  const { item, level } = props;
  const [isOpen, setIsOpen] = useState(false);

  const submenuId = `level-${level}-item-submenu`;

  return (
    <NavListItem
      onMouseLeave={() => setIsOpen(false)}
      onMouseEnter={() => setIsOpen(true)}
    >
      <StyledLink href={item.link}>{item.name}</StyledLink>
      {level > 1 && <StyledTriangleIcon />}
      {item.children != null && item.children.length > 0 && (
        <NavSubList
          level={level}
          isOpen={isOpen}
          aria-expanded={isOpen}
          id={submenuId}
        >
          {item.children?.map((i: MenuItem, key: number) => (
            <MenuChild item={i} key={key} level={level + 1} />
          ))}
        </NavSubList>
      )}
    </NavListItem>
  );
};

export default MenuChild;
