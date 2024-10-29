import React from 'react';
import {
  Image,
  View,
  StyleSheet,
  Pressable,
  Text,
  ImageSourcePropType,
} from 'react-native';
import {colors, shadow, sizes, spacing} from '../constants/theme';
import FavoriteButton from './FavoriteButton';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-navigation-shared-element';
import {StackNavigationProp} from '@react-navigation/stack';

const CARD_WIDTH = sizes.width / 2 - (spacing.m + spacing.m / 2);
const CARD_HEIGHT = 220;

interface Place {
  id: number;
  image: ImageSourcePropType;
  title: string;
  location: string;
  description: string;
  isFavorite: boolean;
  gallery: ImageSourcePropType[];
}

interface TripsListProps {
  list: Place[];
}

type RootStackParamList = {
  TripDetails: {trip: Place};
};

type TripDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'TripDetails'
>;

const TripsList = ({list}: TripsListProps) => {
  const navigation = useNavigation<TripDetailsScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {list.map((item, index) => {
        return (
          <Pressable
            style={styles.cardContainer}
            key={item.id}
            onPress={() => {
              navigation.navigate('TripDetails', {trip: item});
            }}>
            <View style={[styles.card, shadow.light]}>
              <SharedElement
                id={`trip.${item.id}.image`}
                style={styles.imageBox}>
                <Image style={styles.image} source={item.image} />
              </SharedElement>
              <View style={styles.footer}>
                <View style={styles.titleBox}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.location}>{item.location}</Text>
                </View>
              </View>
              <View style={styles.FavoriteButtonContainer}>
                <FavoriteButton
                  placeId={item.id}
                  active={item.isFavorite}
                  style={{}}
                />
              </View>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  FavoriteButtonContainer: {
    position: 'absolute',
    top: spacing.s,
    right: spacing.s,
  },
  cardContainer: {
    marginLeft: spacing.m,
    marginBottom: spacing.m,
    overflow: 'hidden',
    borderRadius: sizes.radius,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: colors.white,
    borderRadius: sizes.radius,
  },
  imageBox: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    overflow: 'hidden',
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT - 60,
    resizeMode: 'cover',
    borderRadius: sizes.radius,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 16,
    marginRight: 10,
  },
  titleBox: {
    flex: 1,
  },
  title: {
    marginVertical: 4,
    fontSize: sizes.body,
    fontWeight: 'bold',
    color: colors.primary,
  },
  location: {
    fontSize: sizes.body,
    color: colors.lightGray,
  },
});

export default TripsList;
