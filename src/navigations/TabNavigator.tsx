import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoriteScreen from '../screens/FavoriteScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Animated, StyleSheet} from 'react-native';
import {colors, sizes} from '../constants/theme';
import ExploreNavigator from './ExploreNavigator';
import TicketsScreen from '../screens/TicketsScreen';
import CreateScreen from '../screens/CreateScreen';

const Tab = createBottomTabNavigator();

const tabs = [
  {
    name: 'Explore',
    screen: ExploreNavigator,
    iconName: 'compass-outline',
    activeIconName: 'compass',
  },
  {
    name: 'Favorite',
    screen: FavoriteScreen,
    iconName: 'heart-outline',
    activeIconName: 'heart',
  },
  {
    name: 'Create',
    screen: CreateScreen,
    iconName: 'add-circle-outline',
    activeIconName: 'add-circle',
  },
  {
    name: 'Tickets',
    screen: TicketsScreen,
    iconName: 'ticket-outline',
    activeIconName: 'ticket',
  },
  {
    name: 'Profile',
    screen: FavoriteScreen,
    iconName: 'person-outline',
    activeIconName: 'person',
  },
];

const TabNavigator = (): JSX.Element => {
  const offsetAnimation = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <Tab.Navigator
        initialRouteName="Explore"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        {tabs.map(({name, iconName, activeIconName, screen}, index) => (
          <Tab.Screen
            key={index}
            name={name}
            options={{
              tabBarIcon: ({focused}) => (
                <Icon
                  name={focused ? activeIconName : iconName}
                  size={28}
                  color={focused ? colors.primary : colors.black}
                />
              ),
            }}
            component={screen}
            listeners={{
              focus: () => {
                Animated.spring(offsetAnimation, {
                  toValue: index * (sizes.width / tabs.length),
                  useNativeDriver: true,
                }).start();
              },
            }}
          />
        ))}
      </Tab.Navigator>
      <Animated.View
        style={[styles.indicator, {transform: [{translateX: offsetAnimation}]}]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    width: 20,
    height: 2,
    borderRadius: 8,
    left: sizes.width / tabs.length / 2 - 10,
    bottom: 5,
    backgroundColor: colors.primary,
  },
});

export default TabNavigator;
