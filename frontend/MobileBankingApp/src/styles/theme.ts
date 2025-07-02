import {DefaultTheme, DarkTheme} from '@react-navigation/native';

// TODO: Schimbate culorile sa fie apropriate de specificatia de design
const colorsLight = {
  primary: '#0A84FF',      // A bright blue for interactive elements
  background: '#F2F2F7',  // A slightly off-white background
  card: '#FFFFFF',         // White for card-like elements
  text: '#1C1C1E',         // Almost black for text
  textSecondary: '#8E8E93', // A secondary, less prominent text color
  border: '#C6C6C8',      // A light grey for borders
  notification: '#FF453A', // A red for notification badges
  success: '#30D158',      // A green for success states
};

const colorsDark = {
  primary: '#0A84FF',      // Blue can often stay the same
  background: '#000000',  // Pure black for OLED screens
  card: '#1C1C1E',         // A very dark grey for cards
  text: '#F2F2F7',         // Almost white for text
  textSecondary: '#8E8E93', // A secondary, less prominent text color
  border: '#38383A',      // A dark grey for borders
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