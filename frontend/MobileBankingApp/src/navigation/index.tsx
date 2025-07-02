// src/navigation/index.tsx

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useTheme} from '../styles/ThemeContext';
import {RootStackParamList} from './types';
import WelcomeScreen from '../features/auth/screens/WelcomeScreen';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import DashboardScreen from '../features/dashboard/screens/DashboardScreen';
import TabNavigator from './TabNavigator';




const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {theme} = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{headerShown: false}}
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
        <Stack.Screen
          name="Dashboard"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        {/* TODO: add logic here to show Auth or App screens */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { RootNavigator };