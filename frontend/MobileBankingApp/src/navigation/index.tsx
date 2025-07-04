import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useTheme } from '../styles/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from './types';
import WelcomeScreen from '../features/auth/screens/WelcomeScreen';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import SplashScreen from '../features/splash/screens/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { theme } = useTheme();
  const { user, isLoading } = useAuth();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        {isLoading ? (
          // Show splash screen while checking auth state
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : user ? (
          // User is authenticated - show app screens
          <Stack.Screen
            name="Dashboard"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          // User is not authenticated - show auth screens
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerTintColor: theme.colors.primary,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{
                headerTitle: '',
                headerTransparent: true,
                headerTintColor: theme.colors.primary,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { RootNavigator };
