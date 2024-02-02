/* ______________________________________________________________________ *\
  Design Guide
\* ______________________________________________________________________ */
const blur = 'blur(14px)';

const borderRadius = {
  rounded_sm: '1px',
  rounded: '4px',
  rounded_lg: '8px',
  rounded_2xl: '16px',
  rounded_full: '9999px',
};

const breakpoints = {
  sm: '640px',
  md: '768px',
  base: '820px',
  lg: '1023px',
  xl: '1280px',
  xxl: '1536px',
  xxxl: '1792px',
  xxxxl: '2048px',
};

const colors = {
  accent: '#ffa01b',
  white: '#ffffff',
  neutral_lightest: '#F5F5F7',
  neutral_light: '#D3D3D3',
  neutral: '#747B91',
  neutral_darkest: '#17161A',
  black: '#000000',
  status: {
    info: '#367bbe',
    danger: '#bf1650',
    success: '#60bd4f',
  },
};

const fonts = {
  family: {
    headings: '"Amatic SC", cursive',
    body: '"Open Sans", sans-serif',
    cta: 'Arial, Helvetica, sans-serif',
  },
  size: {
    '4xs': '2px',
    '3xs': '8px',
    '2xs': '10px',
    xs: '12px',
    sm: '14px',
    base: '16px',
    md: '18px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '60px',
    '5xl': '72px',
    '6xl': '96px',
    '7xl': '128px',
  },
  weight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extrabold: 800,
  },
};

const gridUnit = 8;

const overlay = {
  dark: 'rgba(0, 0, 0, 0.5)',
};

const shadows = {
  xs: '-4px 4px 15px 0px #00000033',
  sm: '0px -6px 8px -2px rgba(0, 0, 0, 0.1)',
  base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md: '-8px 8px 20px 0px rgba(0, 0, 0, 0.2)',
  lg: '0px 8px 20px 8px rgba(0, 0, 0, 0.2) inset',
  xl: '6px 8px 12px 0px rgba(0, 0, 0, 0.5) inset',
  highlight: {
    accent: '0 0 8px 0 rgb(255 154 35 / 1)',
  },
};

const spacing = {
  '4xs': '2px',
  '3xs': '4px',
  '2xs': '8px',
  xs: '12px',
  sm: '20px',
  md: '24px',
  lg: '32px',
  xl: '40px',
  '2xl': '48px',
  '3xl': '56px',
  '4xl': '64px',
  '5xl': '80px',
  '6xl': '96px',
  '7xl': '112px',
  '8xl': '128px',
  '9xl': '144px',
  '10xl': '160px',
  '11xl': '176px',
  '12xl': '192px',
};

export const theme = {
  blur,
  borderRadius,
  breakpoints,
  colors,
  fonts,
  gridUnit,
  overlay,
  shadows,
  spacing,
};
