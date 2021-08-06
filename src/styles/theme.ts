export interface Theme {
  primary: string;
  secondary: string;

  colors: {
    text: string;
    background: string;
  };

  paddings: {
    pd: number;
    halfpd: number;
  };
}
const theme: Theme = {
  primary: 'Inter',
  secondary: 'Vollkorn',
  colors: {
    text: '#fff',
    background: '#6AA0D7',
  },
  paddings: {
    pd: 40,
    halfpd: 20,
  },
};

export default theme;
