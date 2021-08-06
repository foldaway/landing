import styled from 'styled-components';

import { device } from '../../../constants';
import { LevelProp } from '../types';

const NavSubList = styled.ul<LevelProp>`
  list-style: none;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  min-width: 210px;
  flex: 1 0 100%;
  text-align: left;

  @media screen and ${device.laptop} {
    text-align: center;
    left: ${props => (props.level == 1 ? '50%' : '100%')};
    top: ${props => (props.level == 1 ? '100%' : '0')};
    width: -moz-max-content;
    width: max-content;
    max-width: 200px;
    transform: ${props => (props.level == 1 ? 'translateX(-50%)' : '')};

    padding: 0;
    position: absolute;
    z-index: 2;
    margin-top: initial;

    display: none;

    & > li {
      background-color: ${props =>
        props.level == 1 ? '#FFF' : props.theme.colors.accent};
      border: 1px solid
        ${props => (props.level == 1 ? props.theme.colors.accent : '#FFF')};
      border-bottom: none;
      transition: background-color 0.5s;

      &:hover {
        background-color: ${props =>
          props.level == 1 ? '#FFF' : props.theme.colors.accent};
        transition: background-color 0.5s;
      }

      & > a {
        color: ${props =>
          props.level == 1 ? props.theme.colors.accent : '#FFf'};
      }
    }
    & > li:last-child {
      border-bottom: 1px solid
        ${props => (props.level == 1 ? props.theme.colors.accent : '#FFF')};
    }
  }
`;

export default NavSubList;
