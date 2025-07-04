import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { useTheme } from '../../../styles/ThemeContext';
import { ColorPalette } from '../../../styles/theme';
import { useAuth } from '../../../context/AuthContext';
import ExpandableSection from '../../../components/common/ExpandableSection';

const DashboardScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const {
    user,
    logout,
    enableBiometric,
    disableBiometric,
    isBiometricEnabled,
  } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const handleBiometricToggle = async () => {
    if (isBiometricEnabled) {
      Alert.alert(
        'Disable Biometric',
        'Are you sure you want to disable biometric authentication?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Disable',
            style: 'destructive',
            onPress: async () => {
              await disableBiometric();
            },
          },
        ],
      );
    } else {
      Alert.alert(
        'Enable Biometric',
        'Use Face ID or Touch ID to quickly and securely access your banking app?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Enable',
            onPress: async () => {
              await enableBiometric();
              Alert.alert('Success', 'Biometric authentication enabled!');
            },
          },
        ],
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header with user info and logout */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.header}>Acasa</Text>
            <Text style={styles.userEmail}>{user?.identity.traits.email}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Sold disponibil</Text>
          <Text style={styles.balanceValue}>20.000,00 RON</Text>
          <Text style={styles.balanceValue}>5.000,00 EUR</Text>
        </View>

        {/* Biometric Settings */}
        <View style={styles.settingsContainer}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Biometric Authentication</Text>
            <Switch
              value={isBiometricEnabled}
              onValueChange={handleBiometricToggle}
              trackColor={{ false: colors.textSecondary, true: colors.primary }}
              thumbColor={isBiometricEnabled ? '#FFFFFF' : '#f4f3f4'}
            />
          </View>
          <Text style={styles.settingDescription}>
            Use Face ID or Touch ID to quickly access your banking app
          </Text>
        </View>

        <ExpandableSection title="Conturi Curente" colors={colors}>
          {[1, 2].map((_, idx) => (
            <View key={idx} style={styles.accountCard}>
              <Text style={styles.accountTitle}>RO48BTRLRONCT305849021</Text>
              <Text style={styles.accountDetails}>IBAN - 20.000 RON</Text>

              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>Transfer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>Schimb valutar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ExpandableSection>

        <ExpandableSection title="Economii" colors={colors}>
          {[1].map((_, idx) => (
            <View key={idx} style={styles.accountCard}>
              <Text style={styles.accountTitle}>Depozit pe 12 luni</Text>
              <Text style={styles.accountDetails}>10.000 RON @ 6% dobândă</Text>
            </View>
          ))}
        </ExpandableSection>

        <ExpandableSection title="Credite" colors={colors}>
          {[1].map((_, idx) => (
            <View key={idx} style={styles.accountCard}>
              <Text style={styles.accountTitle}>Credit de nevoi personale</Text>
              <Text style={styles.accountDetails}>Sold rămas: 15.000 RON</Text>
            </View>
          ))}
        </ExpandableSection>
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
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    header: {
      fontSize: 26,
      fontWeight: 'bold',
      color: colors.text,
    },
    userEmail: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    logoutButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    logoutButtonText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: 'bold',
    },
    balanceContainer: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    balanceLabel: {
      color: colors.text,
      marginBottom: 8,
    },
    balanceValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primary,
    },
    settingsContainer: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
    settingDescription: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    sectionTitle: {
      marginTop: 24,
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
    },
    accountCard: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginTop: 12,
    },
    accountTitle: {
      color: colors.text,
      fontWeight: 'bold',
    },
    accountDetails: {
      color: colors.textSecondary,
      marginTop: 4,
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    actionButton: {
      backgroundColor: colors.primary,
      borderRadius: 4,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    actionText: {
      color: colors.background,
      fontWeight: 'bold',
    },
    openAccountButton: {
      marginTop: 16,
      backgroundColor: colors.primary,
      borderRadius: 4,
      padding: 12,
      alignItems: 'center',
    },
    openAccountText: {
      color: colors.background,
      fontWeight: 'bold',
    },
  });

export default DashboardScreen;
