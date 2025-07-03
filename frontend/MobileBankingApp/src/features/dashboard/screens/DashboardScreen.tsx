import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../../../styles/ThemeContext';
import { ColorPalette } from '../../../styles/theme';
import ExpandableSection from '../../../components/common/ExpandableSection';

const DashboardScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Acasa</Text>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Sold disponibil</Text>
          <Text style={styles.balanceValue}>20.000,00 RON</Text>
          <Text style={styles.balanceValue}>5.000,00 EUR</Text>
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
    header: {
      fontSize: 26,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
      textAlign: 'center',
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
