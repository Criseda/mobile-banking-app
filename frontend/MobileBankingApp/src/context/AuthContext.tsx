import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentSession, Session, LoginResponse } from '../api/kratosApi';

interface AuthContextType {
  user: Session | null;
  sessionToken: string | null;
  login: (session: LoginResponse['session'], token: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Session | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = await AsyncStorage.getItem('session_token');
      if (token) {
        const session = await getCurrentSession(token);
        setUser(session);
        setSessionToken(token);
      }
    } catch (error) {
      // Invalid token, clear storage
      await AsyncStorage.removeItem('session_token');
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <AuthContext.Provider value={{ user, sessionToken, login, logout, isLoading }}>
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