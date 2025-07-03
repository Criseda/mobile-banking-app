import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ColorPalette } from '../../styles/theme';

interface Props {
  title: string;
  children: React.ReactNode;
  colors: ColorPalette;
}

const ExpandableSection = ({ title, children, colors }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.header, { borderBottomColor: colors.border }]}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={[styles.headerText, { color: colors.text }]}>{title}</Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.text}
        />
      </TouchableOpacity>

      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
  },
});

export default ExpandableSection;
