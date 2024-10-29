import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, shadow, spacing} from '../constants/theme';
import {Pressable} from 'react-native';

interface FavoriteButtonProps {
  active: boolean;
  style: object;
  placeId: number;
}

const FavoriteButton = ({active, style, placeId}: FavoriteButtonProps) => {
  return (
    <Pressable
      onPress={() => {}}
      style={[
        {
          backgroundColor: colors.white,
          padding: 5,
          borderRadius: 20,
        },
        shadow.light,
        style,
      ]}>
      <Icon
        name={active ? 'heart' : 'heart-outline'}
        size={24}
        color={colors.primary}
      />
    </Pressable>
  );
};

export default FavoriteButton;
