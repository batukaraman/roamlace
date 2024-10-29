import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../constants/theme';
import MainHeader from '../components/MainHeader';
import ScreenHeder from '../components/ScreenHeder';
import {ScrollView} from 'react-native-gesture-handler';
import TopPlacesCarousel from '../components/TopPlacesCarousel';
import {PLACES, TOP_PLACES} from '../data';
import SectionHeader from '../components/SectionHeader';
import TripsList from '../components/TripsList';

const ExploreScreen = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <ScreenHeder title="Find Your" subTitle="Dream Trip" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopPlacesCarousel list={TOP_PLACES} />
        <SectionHeader
          withButton={true}
          title="Popular Trips"
          moreScreenName="Populars"
        />
        <TripsList list={PLACES} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ExploreScreen;
