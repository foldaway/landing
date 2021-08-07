import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.a`
  display: inline-block;
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

  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100%;
  margin-right: 10px;
  vertical-align: middle;
`;

const Name = styled.span`
  vertical-align: middle;
`;

interface Props {
  member: GraphQL.Member;
}

const Member: React.FC<Props> = function(props) {
  const { member } = props;

  if (member.name == null) {
    return null;
  }

  return (
    <Wrapper href={member.url}>
      <Avatar src={member.avatarUrl} />
      <Name>{member.name}</Name>
    </Wrapper>
  );
};

export default Member;
