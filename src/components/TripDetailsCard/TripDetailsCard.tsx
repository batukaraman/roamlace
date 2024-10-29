import React, {useMemo, useState} from 'react';
import {ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {colors, sizes, spacing} from '../../constants/theme';
import * as Animatable from 'react-native-animatable';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import CustomBackground from './CustomBackground';
import Icon from 'react-native-vector-icons/AntDesign';
import PlaceDescription from '../PlaceDescription';
import {Tabbar, Tab} from '../Tabbar';

interface Trip {
  id: number;
  image: ImageSourcePropType;
  title: string;
  location: string;
  description: string;
  isFavorite: boolean;
}

interface TripDetailsCardProps {
  trip: Trip;
  animatedIndex: any;
  navigation: any;
}

const TripDetailsCard = ({
  trip,
  animatedIndex,
  navigation,
}: TripDetailsCardProps) => {
  const [titleHeight, setTitleHeight] = useState(0);

  // const snapPoints = useMemo(() => ['30%', '65%'], [titleHeight]);
  const snapPoints = useMemo(
    () =>
      titleHeight > 90
        ? ['35%', '65%']
        : titleHeight > 60
        ? ['30%', '65%']
        : ['25%', '65%'],
    [titleHeight],
  );

  const titleStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.65],
      [colors.white, colors.black],
    ),
    marginBottom: interpolate(
      animatedIndex.value,
      [0, 0.65],
      [0, spacing.s],
      Extrapolation.CLAMP,
    ),
  }));

  const locationStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      animatedIndex.value,
      [0, 0.65],
      [colors.white, colors.gray],
    ),
    fontSize: interpolate(
      animatedIndex.value,
      [0, 0.65],
      [sizes.title, sizes.h4],
      Extrapolation.CLAMP,
    ),
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 0.65],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  const onTitleLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    setTitleHeight(height);
  };

  return (
    <BottomSheet
      snapPoints={snapPoints}
      index={0}
      animatedIndex={animatedIndex}
      handleComponent={() => <></>}
      backgroundComponent={CustomBackground}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <Animatable.View
          style={styles.header}
          animation="fadeInUp"
          easing="ease-in-out"
          delay={500}
          duration={400}>
          <Animated.Text
            style={[styles.title, titleStyle]}
            onLayout={onTitleLayout}
            ellipsizeMode="tail">
            {trip.title}
          </Animated.Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Animated.Text style={[styles.location, locationStyle]}>
              {trip.location}
            </Animated.Text>
            <Animated.View style={[styles.raitingContainer, contentStyle]}>
              <Icon name="star" size={sizes.body} color={'#ffe234'} />
              <Text style={styles.raitingAvg}>4.6</Text>
              <Text style={styles.raitingCount}>(142 Değerlendirme)</Text>
            </Animated.View>
          </View>
        </Animatable.View>
        <Animated.View style={[styles.content, contentStyle]}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>₺150</Text>
            <Text style={styles.priceLabel}>Kişi Başı</Text>
          </View>
          <Tabbar index={0} style={{marginVertical: spacing.s}}>
            <Tab name="Genel Bakış">
              <PlaceDescription text={trip.description} numberOfLines={3} />
            </Tab>
            <Tab name="Değerlendirmeler">
              <PlaceDescription text={trip.description} numberOfLines={3} />
            </Tab>
          </Tabbar>
        </Animated.View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.l,
  },
  header: {
    marginBottom: spacing.s,
  },
  title: {
    fontSize: sizes.title,
    color: colors.white,
    fontWeight: 'bold',
  },
  location: {
    fontSize: sizes.title,
    color: colors.white,
  },
  content: {
    height: sizes.height,
  },
  raitingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  raitingAvg: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: sizes.body,
  },
  raitingCount: {
    color: colors.gray,
    fontSize: sizes.body,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  priceValue: {
    fontSize: sizes.h2,
    fontWeight: 'bold',
    color: colors.primary,
  },
  priceLabel: {
    fontSize: sizes.body,
    color: colors.gray,
    paddingBottom: spacing.xs,
  },
});

export default TripDetailsCard;
