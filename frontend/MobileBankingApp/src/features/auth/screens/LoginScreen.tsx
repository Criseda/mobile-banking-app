import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../styles/ThemeContext';
import { ColorPalette } from '../../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';

const LoginScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={colors.border}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.border}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerButtonText}>
          Don't have an account? <Text style={styles.registerText}>Register</Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.loginButtonContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </View>
    </View>
  );
};

const getStyles = (colors: ColorPalette) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.text,
  },
  input: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 0,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: colors.text,
  },
  registerButton: {
    alignItems: 'center',
  },
  registerButtonText: {
    color: colors.textSecondary,
  },
  registerText: {
    color: colors.text,
  },
  loginButtonContainer: {
    color: colors.primary,
    marginTop: 20,
  },
  loginButton: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
});

export default LoginScreen;
