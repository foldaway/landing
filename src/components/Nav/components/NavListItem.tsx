import styled from 'styled-components';

import { device } from '../../../constants';
import NavSubList from './NavSubList';

const NavListItem = styled.li`
  position: relative;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-flow: row wrap;

  & a {
    padding: ${props => props.theme.paddings.halfpd * 0.25}px
      ${props => props.theme.paddings.halfpd}px;
    display: block;
  }

  @media screen and ${device.laptop} {
    justify-content: center;
    padding: 0 0.5rem;

    &:hover > ${NavSubList} {
      display: block;
    }
  }
`;

export default NavListItem;
