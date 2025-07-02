import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTheme } from '../../../styles/ThemeContext';
import { ColorPalette } from '../../../styles/theme';

const LoginScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

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
      <Button
        title="Login"
        onPress={() => console.log('Login pressed')}
        color={colors.primary}
      />
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
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: colors.text,
  },
});

export default LoginScreen;
