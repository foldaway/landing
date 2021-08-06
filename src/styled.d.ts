import {} from 'styled-components';

import { Theme as ThemeType } from './theme';

declare module 'styled-components' {
  type Theme = ThemeType;
  export interface DefaultTheme extends Theme {}
}
