import { DefaultTheme, DarkTheme } from '@react-navigation/native';

// TODO: Schimbate culorile sa fie apropriate de specificatia de design
const colorsLight = {
  primary: '#5f9df0',
  background: '#F2F2F7',
  card: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
  border: '#C6C6C8',
  notification: '#FF453A',
  success: '#30D158',
};

const colorsDark = {
  primary: '#5f9df0',
  background: '#181b26',
  card: '#29304a',
  text: '#F2F2F7',
  textSecondary: '#8E8E93',
  border: '#38383A',
  notification: '#FF453A',
  success: '#30D158',
};

export const AppLightTheme = {
  ...DefaultTheme, // Extends the default light theme from React Navigation
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...colorsLight,
  },
};

export const AppDarkTheme = {
  ...DarkTheme, // Extends the default dark theme from React Navigation
  dark: true,
  colors: {
    ...DarkTheme.colors,
    ...colorsDark,
  },
};

// type definition for our color palette
export type ColorPalette = typeof colorsLight;
