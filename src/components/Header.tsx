import React, { useContext } from 'react';
import styled from 'styled-components';

import { device } from '../constants';
import SiteConfigurationContext from '../contexts/SiteConfigurationContext';
import Nav from './Nav';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row wrap;

  width: 100%;
`;

const Toggle = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30px;
  cursor: pointer;
  margin-left: auto;
  & > div {
    height: 3px;
    width: 30px;
    background-color: ${props => props.theme.colors.accent};
    margin-bottom: 5px;
  }
  & > div:last-child {
    margin-bottom: 0;
  }
  &:hover > div {
    background-color: #aaaaaa;
    transition: background-color cubic-bezier(0.4, 0, 0.2, 1) 0.25s;
  }
  @media screen and ${device.laptop} {
    display: none;
  }
`;

const ToggleInput = styled.input`
  display: none;
  &:checked + ${Toggle} > div {
    background-color: #aaaaaa;
    margin-bottom: 0;
  }
  &:checked + ${Toggle} > div:nth-child(2) {
    height: 0;
    transition: height cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
  }
  &:checked + ${Toggle} > div:first-child {
    transform: translate(0, 1.5px) rotate(45deg);
  }
  &:checked + ${Toggle} > div:last-child {
    transform: translate(0, -1.5px) rotate(-45deg);
  }
  &:checked + ${Toggle} > div:first-child,
  &:checked + ${Toggle} > div:last-child {
    transition: transform cubic-bezier(0.52, 1.64, 0.37, 0.66) 0.25s;
  }
  &:checked ~ nav {
    max-height: calc(100vh - 4rem - 70px);
    overflow: scroll;
    transition: max-height cubic-bezier(0.52, 1.64, 0.37, 0.66) 0.5s;
    margin-top: ${props => props.theme.paddings.pd}px;
  }
`;

interface Props {
  title: string;
}

const Header: React.FC<Props> = function(props) {
  const { title } = props;
  const siteConfig = useContext(SiteConfigurationContext);

  if (siteConfig === null) {
    return null;
  }

  return (
    <Wrapper>
      <span>{title}</span>
      <ToggleInput type="checkbox" id="toggle" />
      <Toggle htmlFor="toggle">
        <div></div>
        <div></div>
        <div></div>
      </Toggle>
      <Nav data={siteConfig.menu_items} />
    </Wrapper>
  );
};

export default Header;
