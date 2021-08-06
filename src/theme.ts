export interface Theme {
  colors: {
    main: string;
    secondary: string;
    accent: string;
  };

  paddings: {
    pd: number;
    halfpd: number;
  };
}

const lightTheme: Theme = {
  colors: {
    main: '#000',
    secondary: '#555',
    accent: '#18A999',
  },
  paddings: {
    pd: 40,
    halfpd: 20,
  },
};

const darkTheme: Theme = {
  colors: {
    main: '#000',
    secondary: '#555',
    accent: '#18A999',
  },
  paddings: {
    pd: 40,
    halfpd: 20,
  },
};

export default function theme() {
  const isDarkMode =
    (typeof window !== 'undefined' &&
      'matchMedia' in window &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) ??
    false;

  if (isDarkMode) {
    return darkTheme;
  }

  return lightTheme;
}
