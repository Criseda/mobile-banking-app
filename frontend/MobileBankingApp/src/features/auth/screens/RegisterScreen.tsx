import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../../styles/ThemeContext';
import { ColorPalette } from '../../../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { useAuth } from '../../../context/AuthContext';
import {
  initRegistrationFlow,
  submitRegistration,
  initLoginFlow,
  submitLogin,
} from '../../../api/kratosApi';

const RegisterScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // Validation
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Step 1: Initialize registration flow
      const registrationFlow = await initRegistrationFlow();

      // Step 2: Submit registration
      await submitRegistration(registrationFlow.id, email, password);

      // Step 3: Auto-login after successful registration
      const loginFlow = await initLoginFlow();
      const loginResponse = await submitLogin(loginFlow.id, email, password);

      // Step 4: Save session - AuthContext will handle navigation automatically
      await login(loginResponse.session, loginResponse.session_token);
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Failed',
        'This email may already be registered or there was a server error. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="new-password"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={colors.textSecondary}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete="new-password"
        />

        <TouchableOpacity
          style={[
            styles.registerButton,
            isLoading && styles.registerButtonDisabled,
          ]}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text style={styles.registerButtonText}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginLinkText}>
            Already have an account?{' '}
            <Text style={styles.loginLinkTextBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors: ColorPalette) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
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
      backgroundColor: colors.card,
      borderWidth: 0,
      marginBottom: 15,
      paddingHorizontal: 10,
      borderRadius: 10,
      color: colors.text,
    },
    registerButton: {
      backgroundColor: colors.primary,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    registerButtonDisabled: {
      opacity: 0.6,
    },
    registerButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    loginLink: {
      alignItems: 'center',
      marginTop: 20,
    },
    loginLinkText: {
      color: colors.textSecondary,
    },
    loginLinkTextBold: {
      color: colors.text,
      fontWeight: 'bold',
    },
  });

export default RegisterScreen;
