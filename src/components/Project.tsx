import React from 'react';
import styled from 'styled-components';

const Arrow = styled.span`
  position: absolute;
  top: 0;
  right: 0;
`;

const Title = styled.span`
  position: relative;
  grid-area: title;
  padding-right: 44px;
  font-weight: 500;
  font-size: 48px;
  line-height: 1;
  letter-spacing: -0.04em;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakMedium}) {
    white-space: initial;
  }
`;

const Wrapper = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.theme.colors.primary};
  text-decoration: none;
  color: ${props => props.theme.colors.primary};

  &:visited {
    color: ${props => props.theme.colors.primary};
  }

  &:hover {
    ${Arrow} {
      top: -5px;
      right: -5px;
    }

    ${Title} {
      text-decoration: underline;
    }
  }

  @media (max-width: ${props => props.theme.breakMedium}) {
    display: grid;
    grid-template:
      'index title'
      'description description'
      / auto 1fr;
    justify-items: start;
  }
`;

const Index = styled.span`
  grid-area: index;
  opacity: 0.5;
  font-style: italic;
  font-size: 14px;
`;

const Description = styled.span`
  grid-area: description;
  flex-grow: 1;
  font-family: ${props => props.theme.secondary};
  font-style: italic;
  font-size: 18px;
  text-align: right;

  @media (max-width: ${props => props.theme.breakMedium}) {
    text-align: left;
  }
`;

interface Props {
  index: number;
  project: {
    title: string;
    description: string;
    url: string;
  };
}

const Project: React.FC<Props> = function(props) {
  const {
    index,
    project: { title, description, url },
  } = props;
  return (
    <Wrapper href={url} target="_blank" rel="noopener noreferrer">
      <Index>{('0' + index).slice(-2)}</Index>
      <Title>
        {title}
        <Arrow>↗</Arrow>
      </Title>
      <Description>{description}</Description>
    </Wrapper>
  );
};

export default Project;
