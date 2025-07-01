// src/features/auth/screens/WelcomeScreen.tsx

import React from 'react';
import {Text, StyleSheet, Button, SafeAreaView} from 'react-native';
import {useTheme} from '../../../styles/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

export const WelcomeScreen = () => {
  const {colors, isDarkMode} = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.text}]}>
        Welcome to Mobile Bank
      </Text>
      <Text style={[styles.subtitle, {color: colors.text}]}>
        Current Mode: {isDarkMode ? 'Dark' : 'Light'}
      </Text>
      <Button
        title="Login / Register"
        onPress={() => navigation.navigate('Login')}
        color={colors.primary}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
});