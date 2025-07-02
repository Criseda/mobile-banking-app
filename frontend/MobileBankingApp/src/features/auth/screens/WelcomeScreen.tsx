// src/features/auth/screens/WelcomeScreen.tsx

import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../styles/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { ColorPalette } from '../../../styles/theme';

const WelcomeScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const styles = getStyles(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Mobile Bank</Text>
      <Text style={styles.subtitle}>
        Current Mode: {isDarkMode ? 'Dark' : 'Light'}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const getStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 8,
      color: colors.text,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 32,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default WelcomeScreen;