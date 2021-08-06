export interface Theme {
  primary: string;
  secondary: string;

  colors: {
    primary: string;
    accent: string;
  };

  paddings: {
    pd: number;
    halfpd: number;
  };

  breakMedium: string;
}
const theme: Theme = {
  primary: 'Inter',
  secondary: 'Vollkorn',
  colors: {
    primary: '#fff',
    accent: '#6AA0D7',
  },
  paddings: {
    pd: 40,
    halfpd: 20,
  },

  breakMedium: '768px',
};

export default theme;
