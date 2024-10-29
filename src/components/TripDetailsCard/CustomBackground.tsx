import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {colors} from '../../constants/theme';
import {BottomSheetBackgroundProps} from '@gorhom/bottom-sheet';

const CustomBackground = ({
  animatedIndex,
  style,
}: BottomSheetBackgroundProps) => {
  const containerStyle = useAnimatedStyle(() => ({
    ...(style as object),
    backgroundColor: colors.white,
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.08],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return <Animated.View style={containerStyle} />;
};

export default CustomBackground;
