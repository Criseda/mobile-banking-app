import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../features/dashboard/screens/DashboardScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

import { StyleSheet } from 'react-native';

const DummyScreen = ({ title }: { title: string }) => (
  <Text style={styles.dummyText}>{title}</Text>
);

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Acasa" component={DashboardScreen} />
      <Tab.Screen
        name="Carduri"
        children={() => <DummyScreen title="Carduri" />}
      />
      <Tab.Screen
        name="Campanii"
        children={() => <DummyScreen title="Campanii" />}
      />
      <Tab.Screen
        name="Notificari"
        children={() => <DummyScreen title="Notificari" />}
      />
      <Tab.Screen
        name="Diverse"
        children={() => <DummyScreen title="Diverse" />}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  dummyText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 200,
  },
});

export default TabNavigator;
