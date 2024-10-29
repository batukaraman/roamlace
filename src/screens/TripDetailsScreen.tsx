import React, {useState} from 'react';
import {ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {colors, sizes, spacing} from '../constants/theme';
import TripDetailsCard from '../components/TripDetailsCard/TripDetailsCard';
import TripDetailsCarousel from '../components/TripDetailsCarousel';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';
import {ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Trip {
  id: number;
  image: ImageSourcePropType;
  title: string;
  location: string;
  description: string;
  isFavorite: boolean;
  gallery: ImageSourcePropType[];
}

type RootStackParamList = {
  TripDetails: {trip: Trip};
};

type TripDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TripDetails'
>;
type TripDetailsScreenRouteProp = RouteProp<RootStackParamList, 'TripDetails'>;

interface TripDetailsScreenProps {
  navigation: TripDetailsScreenNavigationProp;
  route: TripDetailsScreenRouteProp;
}

const TripDetailsScreen = ({navigation, route}: TripDetailsScreenProps) => {
  const {trip} = route.params;

  const slides = [trip.image, ...trip.gallery];
  const animatedIndex = useSharedValue(0);

  const [showIndicator, setShowIndicator] = useState(false);

  useAnimatedReaction(
    () => animatedIndex.value,
    value => {
      const shouldShowIndicator = value <= 0;
      if (shouldShowIndicator !== showIndicator) {
        runOnJS(setShowIndicator)(shouldShowIndicator);
      }
    },
  );

  const carouselStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        animatedIndex.value,
        [0, 1],
        [sizes.height, sizes.height * 0.35],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={carouselStyle}
        onTouchEnd={() => {
          console.log('Open Gallery');
        }}>
        <TripDetailsCarousel
          animatedIndex={animatedIndex}
          indicatorShown={false}
          slides={slides}
          id={trip.id}
        />

        <Animatable.View
          animation={showIndicator ? 'fadeOut' : 'fadeIn'}
          easing="ease-in-out"
          delay={500}
          duration={400}
          style={styles.allImagesContainer}>
          <ImageBackground
            source={trip.image}
            style={styles.allImages}
            blurRadius={50}
            resizeMode="cover">
            <Text style={styles.allImagesText}>+73</Text>
          </ImageBackground>
        </Animatable.View>
        {showIndicator && (
          <Animatable.View
            animation="fadeInUp"
            easing="ease-in-out"
            delay={500}
            duration={400}
            style={styles.slideControl}>
            <Icon
              name="chevron-up-outline"
              size={24}
              color={colors.lightGray}
            />
            <Text style={styles.slideControlText}>Yukarı Kaydır</Text>
          </Animatable.View>
        )}
      </Animated.View>
      <TripDetailsCard
        trip={trip}
        animatedIndex={animatedIndex}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  imageBox: {
    flex: 1,
  },
  image: {
    width: sizes.width,
    height: sizes.height,
    resizeMode: 'cover',
  },
  allImagesContainer: {
    position: 'absolute',
    right: spacing.s,
    bottom: spacing.s,
    borderRadius: sizes.radius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  allImages: {
    height: 40,
    width: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  allImagesText: {
    color: colors.white,
  },
  slideControl: {
    position: 'absolute',
    bottom: 0,
    padding: spacing.m,
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideControlText: {
    color: colors.lightGray,
    fontSize: sizes.h4,
  },
});

export default TripDetailsScreen;
