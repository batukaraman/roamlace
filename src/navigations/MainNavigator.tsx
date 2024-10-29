import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {StatusBar, Text, View} from 'react-native';
import OtherHeader from '../components/OtherHeader';
import MainHeader from '../components/MainHeader';
import {colors} from '../constants/theme';

const Stack = createSharedElementStackNavigator();

const MainNavigator = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={TabNavigator}
          options={{
            header: () => <MainHeader />,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="TripDetails"
          component={TripDetailsScreen}
          sharedElements={(route, otherRoute, showing) => {
            const {trip} = route.params;
            return [`trip.${trip.id}.image`];
          }}
          options={{
            headerTransparent: true,
            header: () => <OtherHeader />,
            gestureEnabled: false,
            cardStyleInterpolator: ({current: {progress}}) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
