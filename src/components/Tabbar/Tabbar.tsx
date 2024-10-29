import React, {useState, useRef, useEffect, ReactElement} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {colors, sizes, spacing} from '../../constants/theme';

interface TabbarProps {
  style?: ViewStyle | TextStyle;
  index: number;
  children: ReactElement[];
}

const Tabbar = ({style, index, children}: TabbarProps) => {
  const [selectedIndex, setSelectedIndex] = useState(index);
  const tabWidths = useRef<number[]>([]);
  const translateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);

  useEffect(() => {
    setIndicatorPosition(selectedIndex);
  }, [selectedIndex]);

  const setIndicatorPosition = (index: number) => {
    translateX.value = withSpring(
      tabWidths.current.slice(0, index).reduce((a, b) => a + b, 0),
    );
    indicatorWidth.value = withTiming(tabWidths.current[index], {
      duration: 300,
      easing: Easing.ease,
    });
  };

  const handleLayout = (event: any, index: number) => {
    const {width} = event.nativeEvent.layout;
    tabWidths.current[index] = width;

    if (index === selectedIndex) {
      setIndicatorPosition(selectedIndex);
    }
  };

  const tabs = children.map((child, i) => (
    <Pressable
      key={i}
      onPress={() => setSelectedIndex(i)}
      onLayout={event => handleLayout(event, i)}>
      <Text style={[styles.tabText, selectedIndex === i && styles.activeTab]}>
        {child.props.name}
      </Text>
    </Pressable>
  ));

  const animatedIndicatorStyle = useAnimatedStyle(
    () => ({
      width: indicatorWidth.value,
      transform: [{translateX: translateX.value + selectedIndex * spacing.m}],
    }),
    [selectedIndex],
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.tabContainer}>
        {tabs}
        <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
      </View>
      <View style={styles.contentContainer}>
        {children[selectedIndex].props.children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: spacing.m,
    paddingVertical: spacing.s,
    marginBottom: spacing.s,
    position: 'relative',
  },
  tabText: {
    fontSize: sizes.h4,
    color: colors.gray,
  },
  activeTab: {
    color: colors.primary,
  },
  contentContainer: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    height: 2,
    borderRadius: 8,
    backgroundColor: colors.primary,
    bottom: 3,
  },
});

export default Tabbar;
