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

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

// --- Mock function to simulate checking auth status ---
// In a real app, this would check AsyncStorage for a token
const checkAuthStatus = async (): Promise<boolean> => {
  // Simulate a network request or async operation
  await new Promise(resolve => setTimeout(resolve, 1500));
  // For now, we'll assume the user is not logged in.
  // Later replace this with real logic.
  return false;
};
// ----------------------------------------------------

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    const initializeApp = async () => {
      const isLoggedIn = await checkAuthStatus();

      if (isLoggedIn) {
        // Check for FaceID or TouchID or PIN to refresh token
        // For now, we will always navigate to Welcome
      } else {
        navigation.replace('Welcome');
      }
    };

    initializeApp();
  }, [navigation]);

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
