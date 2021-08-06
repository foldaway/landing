import React from 'react';
import styled from 'styled-components';

import computerGuyUrl from '../assets/images/computer-guy.svg';
import { ReactComponent as Logo } from '../assets/images/ie9.svg';

const StyledContainer = styled.div`
  position: relative;
  height: 200px;
  background: url(${computerGuyUrl}) no-repeat;
  background-size: contain;
`;

const StyledLogo = styled(Logo)`
  height: 30px;
  width: 30px;
  margin-top: 120px;
  margin-left: 50px;
`;

const ComponentWithSVG: React.FC = function() {
  return (
    <StyledContainer>
      <StyledLogo />
    </StyledContainer>
  );
};

export default ComponentWithSVG;
