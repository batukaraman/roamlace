import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, sizes, spacing} from '../constants/theme';
import {Image} from 'react-native';

const MainHeader = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Icon
        name="notifications-outline"
        size={30}
        color={colors.black}
        onPress={() => {}}
      />
      <View style={styles.avatarContainer}>
        <Image
          source={{uri: 'https://i.pravatar.cc/150?img=57'}}
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
    backgroundColor: colors.white,
  },
  avatarContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    overflow: 'hidden',
  },
  avatar: {
    width: 30,
    height: 30,
  },
});

export default MainHeader;
