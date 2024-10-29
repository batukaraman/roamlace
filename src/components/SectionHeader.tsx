import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {colors, sizes, spacing} from '../constants/theme';

interface SectionHeaderProps {
  title: string;
  moreScreenName: string;
  withButton: boolean;
}

const SectionHeader = ({
  title,
  moreScreenName,
  withButton = true,
}: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {withButton && (
        <Pressable onPress={() => console.log(moreScreenName)}>
          <Text style={styles.buttonText}>See All</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: spacing.l,
    marginTop: spacing.l,
    marginBottom: spacing.s,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.black,
  },
  buttonText: {
    fontSize: sizes.body,
    color: colors.primary,
  },
});

export default SectionHeader;
