import React, { useEffect } from 'react';
import {
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../styles/ThemeContext';
import { useAuth } from '../../../context/AuthContext';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Wait for auth context to finish loading
    if (!isLoading) {
      if (user) {
        // User is logged in, go to dashboard
        navigation.replace('Dashboard');
      } else {
        // User is not logged in, go to welcome
        navigation.replace('Welcome');
      }
    }
  }, [isLoading, user, navigation]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Image
        source={
          isDarkMode
            ? require('../../../assets/images/techventures-logo-light.png')
            : require('../../../assets/images/techventures-logo-dark.png')
        }
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" style={styles.spinner} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: 100,
  },
  spinner: {
    marginTop: 50,
  },
});

export default SplashScreen;
