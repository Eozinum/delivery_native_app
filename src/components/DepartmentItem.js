import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {spacing, fontSizes} from '../constants/sizes';

export const DepartmentItem = ({department}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{department}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    paddingTop: spacing.md,
  },
  title: {
    fontSize: fontSizes.md,
  },
});
