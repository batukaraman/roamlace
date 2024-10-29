import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Image,
  Animated as NativeAnimated,
} from 'react-native';
import {sizes} from '../constants/theme';
import {SharedElement} from 'react-navigation-shared-element';
import CarouselIndicators from './CarouselIndicators';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface TripDetailsCarouselProps {
  slides: ImageSourcePropType[];
  id: number;
  indicatorShown: boolean;
}

const TripDetailsCarousel = ({
  animatedIndex,
  slides,
  id,
  indicatorShown = true,
}: TripDetailsCarouselProps) => {
  const scrollAnimated = useRef(new NativeAnimated.Value(0)).current;

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [1, 0],
      [0, 0.5],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <View style={styles.container}>
      <NativeAnimated.FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={NativeAnimated.event(
          [{nativeEvent: {contentOffset: {x: scrollAnimated}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item: image, index}) => {
          if (!index) {
            return (
              <>
                <SharedElement id={`trip.${id}.image`} style={styles.slide}>
                  <Image source={image} style={styles.image} />
                </SharedElement>
                <Animatable.View
                  animation="fadeIn"
                  easing="ease-in-out"
                  delay={500}
                  duration={400}
                  style={styles.overlayContainer}>
                  <Animated.View style={overlayStyle}>
                    <LinearGradient
                      style={styles.overlay}
                      start={{x: 0.0, y: -0.4}}
                      end={{x: 0.0, y: 1.0}}
                      colors={[
                        'rgba(0, 0, 0, 1)',
                        'rgba(0, 0, 0, 0)',
                        'rgba(0, 0, 0, 1)',
                      ]}></LinearGradient>
                  </Animated.View>
                </Animatable.View>
              </>
            );
          }
          return (
            <View style={styles.slide}>
              <Image source={image} style={styles.image} />
              <Animatable.View
                animation="fadeIn"
                easing="ease-in-out"
                delay={500}
                duration={400}
                style={styles.overlayContainer}>
                <Animated.View style={overlayStyle}>
                  <LinearGradient
                    style={styles.overlay}
                    start={{x: 0.0, y: -0.4}}
                    end={{x: 0.0, y: 1.0}}
                    colors={[
                      'rgba(0, 0, 0, 1)',
                      'rgba(0, 0, 0, 0)',
                      'rgba(0, 0, 0, 1)',
                    ]}></LinearGradient>
                </Animated.View>
              </Animatable.View>
            </View>
          );
        }}
      />
      {indicatorShown && slides.length > 1 && (
        <Animatable.View
          style={styles.indicators}
          animation="fadeInUp"
          easing="ease-in-out"
          delay={100}
          duration={300}>
          <CarouselIndicators
            slidesCount={slides.length}
            slideWidth={sizes.width}
            scrollAnimated={scrollAnimated}
          />
        </Animatable.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: sizes.width,
    height: sizes.height,
    resizeMode: 'cover',
  },
  indicators: {
    position: 'absolute',
    width: sizes.width,
    bottom: 60,
    alignItems: 'center',
    zIndex: 1,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
});

export default TripDetailsCarousel;
