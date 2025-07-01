import 'react-native-gesture-handler'; // Should be at the top
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from './src/navigation';
import {ThemeProvider} from './src/styles/ThemeContext'; // Import our new provider

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;