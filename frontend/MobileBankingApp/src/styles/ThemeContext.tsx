import React, {createContext, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {AppLightTheme, AppDarkTheme, ColorPalette} from './theme';

// Define the shape of our context
interface ThemeContextType {
  isDarkMode: boolean;
  colors: ColorPalette;
  theme: typeof AppLightTheme; // either light or dark theme object
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create the provider component
export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const theme = isDarkMode ? AppDarkTheme : AppLightTheme;

  const value = {
    isDarkMode,
    colors: theme.colors,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Create a custom hook for easily accessing the theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};