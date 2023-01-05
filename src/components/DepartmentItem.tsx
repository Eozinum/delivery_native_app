import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {spacing, fontSizes} from '../constants/sizes';

export const DepartmentItem = ({department}: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{department}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.md,
  },
});
