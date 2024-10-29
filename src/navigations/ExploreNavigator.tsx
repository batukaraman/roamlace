import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ExploreScreen from '../screens/ExploreScreen';

const Stack = createSharedElementStackNavigator();

const ExploreNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default ExploreNavigator;
