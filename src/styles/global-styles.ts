import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    height: 100%;
    width: 100%;
    margin: 0;
  }

  body {
    height: 100%;
    width: 100%;
    margin: 0;
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${props => props.theme.primary};
    font-size: 18px;

    > div {
      width: 90%;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
`;

export default GlobalStyle;
