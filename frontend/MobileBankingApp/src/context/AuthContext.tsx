import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentSession, Session, LoginResponse } from '../api/kratosApi';
import ReactNativeBiometrics from 'react-native-biometrics';

interface AuthContextType {
  user: Session | null;
  sessionToken: string | null;
  login: (session: LoginResponse['session'], token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  enableBiometric: () => Promise<void>;
  disableBiometric: () => Promise<void>;
  isBiometricEnabled: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Session | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  const authenticateWithBiometric = useCallback(async (): Promise<boolean> => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();

      // Check if biometric is available
      const { available } = await rnBiometrics.isSensorAvailable();

      if (!available) {
        console.log('Biometric not available, skipping...');
        return true; // Skip biometric if not available
      }

      // Prompt for biometric authentication
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: 'Please authenticate to access your banking app',
        fallbackPromptMessage: 'Use your device passcode',
      });

      return success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false; // Fail on error for security
    }
  }, []);

  const checkAuthState = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('session_token');
      const biometricEnabled = await AsyncStorage.getItem('biometric_enabled');

      setIsBiometricEnabled(biometricEnabled === 'true');

      if (token) {
        const session = await getCurrentSession(token);
        setUser(session);
        setSessionToken(token);

        // If biometric is enabled, require biometric authentication
        if (biometricEnabled === 'true') {
          const biometricSuccess = await authenticateWithBiometric();
          if (!biometricSuccess) {
            // Biometric failed, clear session
            await AsyncStorage.removeItem('session_token');
            setUser(null);
            setSessionToken(null);
          }
        }
      }
    } catch (error) {
      // Invalid token, clear storage
      await AsyncStorage.removeItem('session_token');
      setUser(null);
      setSessionToken(null);
    } finally {
      setIsLoading(false);
    }
  }, [authenticateWithBiometric]);

  // Check for existing session on app start
  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  const login = async (session: LoginResponse['session'], token: string) => {
    await AsyncStorage.setItem('session_token', token);
    setUser(session);
    setSessionToken(token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('session_token');
    setUser(null);
    setSessionToken(null);
  };

  const enableBiometric = async () => {
    await AsyncStorage.setItem('biometric_enabled', 'true');
    setIsBiometricEnabled(true);
  };

  const disableBiometric = async () => {
    await AsyncStorage.setItem('biometric_enabled', 'false');
    setIsBiometricEnabled(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        sessionToken,
        login,
        logout,
        isLoading,
        enableBiometric,
        disableBiometric,
        isBiometricEnabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
