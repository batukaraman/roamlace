import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Pressable,
  Text,
  View,
} from 'react-native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import FovoriteButton from './FavoriteButton';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

interface Place {
  id: number;
  image: ImageSourcePropType;
  title: string;
  location: string;
  description: string;
  isFavorite: boolean;
}

interface TopPlacesCarouselProps {
  list: Place[];
}

type RootStackParamList = {
  TripDetails: {trip: Place};
};

type TripDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TripDetails'
>;

const TopPlacesCarousel = ({list}: TopPlacesCarouselProps) => {
  const navigation = useNavigation<TripDetailsScreenNavigationProp>();

  return (
    <FlatList
      data={list}
      horizontal
      snapToInterval={sizes.width - 80 + spacing.m}
      decelerationRate={'fast'}
      keyExtractor={item => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
        return (
          <Pressable
            style={[
              styles.card,
              {marginRight: index === list.length - 1 ? spacing.m : 0},
              shadow.dark,
            ]}
            onPress={() => {
              navigation.navigate('TripDetails', {trip: item});
            }}>
            <FovoriteButton
              placeId={item.id}
              style={styles.favorite}
              active={item.isFavorite}
            />
            <SharedElement id={`trip.${item.id}.image`} style={styles.imageBox}>
              <Image source={item.image} style={styles.image} />
            </SharedElement>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <LinearGradient
              style={styles.overlay}
              colors={[
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0.7)',
              ]}></LinearGradient>
          </Pressable>
        );
      }}></FlatList>
  );
};

const styles = StyleSheet.create({
  card: {
    width: sizes.width - 80,
    height: 200,
    marginLeft: spacing.m,
    marginVertical: spacing.s,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
  favorite: {
    position: 'absolute',
    top: spacing.s,
    right: spacing.m,
    marginVertical: 10,
    zIndex: 1,
  },
  imageBox: {
    width: sizes.width - 80,
    height: 200,
  },
  image: {
    width: sizes.width - 80,
    height: 200,
    resizeMode: 'cover',
    borderRadius: sizes.radius,
  },
  titleBox: {
    position: 'absolute',
    top: 200 - 80,
    left: spacing.m,
    zIndex: 1,
  },
  title: {
    fontSize: sizes.h3,
    fontWeight: 'bold',
    color: colors.white,
  },
  location: {
    fontSize: sizes.h3,
    color: colors.white,
  },
});

export default TopPlacesCarousel;
