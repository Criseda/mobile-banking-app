import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
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
import { initLoginFlow, submitLogin } from '../../../api/kratosApi';

const LoginScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // Initialize login flow
      const loginFlow = await initLoginFlow();

      // Submit login
      const response = await submitLogin(loginFlow.id, email, password);

      // Save session - AuthContext will handle navigation automatically
      await login(response.session, response.session_token);
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>
            Don't have an account?{' '}
            <Text style={styles.registerText}>Register</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>
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
      flex: 1,
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
      alignItems: 'center',
    },
    registerButtonText: {
      color: colors.textSecondary,
    },
    registerText: {
      color: colors.text,
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
    loginButtonDisabled: {
      opacity: 0.6,
    },
  });

export default LoginScreen;
