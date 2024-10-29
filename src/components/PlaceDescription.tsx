import React, {useState} from 'react';

import {StyleSheet, Text} from 'react-native';
import {colors, sizes, spacing} from '../constants/theme';

interface IPlaceDescription {
  text: string;
  numberOfLines: number;
}

const PlaceDescription = ({text, numberOfLines}: IPlaceDescription) => {
  const [isTruncatedText, setIsTruncatedText] = useState(false);
  const [showMore, setShowMore] = useState(true);

  return isTruncatedText && numberOfLines ? (
    <>
      <Text
        style={styles.description}
        numberOfLines={showMore ? numberOfLines : 0}>
        {text}
      </Text>
      <Text style={styles.readMore} onPress={() => setShowMore(!showMore)}>
        {showMore ? 'Devamını Oku' : 'Gizle'}
      </Text>
    </>
  ) : (
    <Text
      style={styles.description}
      onTextLayout={event => {
        const {lines} = event.nativeEvent;
        setIsTruncatedText(lines?.length > numberOfLines);
      }}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: sizes.body,
    lineHeight: sizes.body * 1.5,
    color: colors.black,
  },
  readMore: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default PlaceDescription;
