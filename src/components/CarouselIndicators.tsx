import React, {useMemo, useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {colors, sizes, spacing} from '../constants/theme';

interface CarouselIndicatorsProps {
  slidesCount: number;
  slideWidth: number;
  scrollAnimated: any;
}

const CarouselIndicators = ({
  slidesCount,
  slideWidth,
  scrollAnimated,
}: CarouselIndicatorsProps) => {
  const slides = useRef(Array.from(Array(slidesCount).keys())).current;

  const {inputRange, translateOutputRange} = useMemo(
    () =>
      slides.reduce(
        (
          acc: {inputRange: any[]; translateOutputRange: any[]},
          _: number,
          index: number,
          arr: number[],
        ) => {
          const width = slideWidth * index;
          const translateX = index * (12 + 8);

          acc.inputRange.push(width);
          acc.translateOutputRange.push(translateX);

          if (index < arr.length - 1) {
            acc.inputRange.push(width + slideWidth / 2);
            acc.translateOutputRange.push(translateX);
          }

          return acc;
        },
        {inputRange: [], translateOutputRange: []},
      ),
    [slideWidth, slides],
  );

  return (
    <View style={styles.container}>
      {slides.map((_, index) => {
        return <View key={index} style={styles.dot} />;
      })}
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [
              {
                translateX: scrollAnimated.interpolate({
                  inputRange,
                  outputRange: translateOutputRange,
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.s,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: sizes.radius,
  },
  dot: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: 12,
    height: 12,
  },
  indicator: {
    position: 'absolute',
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: 12,
    height: 12,
    top: 2,
    left: 4,
  },
});

export default CarouselIndicators;
