import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, sizes, spacing} from '../constants/theme';

interface ScreenHederProps {
  title: string;
  subTitle: string;
}

const ScreenHeder = ({title, subTitle}: ScreenHederProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: sizes.title,
    fontWeight: 'bold',
    color: colors.black,
  },
  subTitle: {
    fontSize: sizes.title,
    color: colors.gray,
  },
});

export default ScreenHeder;
