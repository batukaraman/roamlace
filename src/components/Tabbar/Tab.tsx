import React from 'react';
import {View} from 'react-native';

interface TabProps {
  name: string;
  children: React.ReactNode;
}

const Tab = ({children}: TabProps) => {
  return <View>{children}</View>;
};

export default Tab;
