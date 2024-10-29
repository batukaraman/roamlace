import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, sizes, spacing} from '../constants/theme';

const OtherHeader = () => {
  const navigation = useNavigation();

  return (
    <Animatable.View
      animation="fadeIn"
      easing="ease-in-out"
      delay={500}
      duration={400}
      style={styles.container}>
      <Pressable onPress={navigation.goBack}>
        <Icon name="arrow-back-outline" size={30} color={colors.white} />
      </Pressable>
      <View style={styles.right}>
        <Pressable>
          <Icon name="bookmark-outline" size={30} color={colors.white} />
        </Pressable>
        <Pressable>
          <Icon name="share-outline" size={30} color={colors.white} />
        </Pressable>
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.m,
  },
  right: {
    flexDirection: 'row',
    gap: spacing.s,
  },
});

export default OtherHeader;
