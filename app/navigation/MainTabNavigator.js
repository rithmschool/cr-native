import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SchoolsScreen from '../screens/SchoolsScreen';
import BlogScreen from '../screens/BlogScreen';
import SchoolScreen from '../screens/SchoolScreen';

const SchoolsStack = createStackNavigator({
  Schools: SchoolsScreen,
  School: SchoolScreen
});

SchoolsStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: '#4F922F'
  },
  tabBarLabel: 'Schools',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-school` : 'md-school'}
    />
  )
};

const BlogStack = createStackNavigator({
  Blog: BlogScreen
});

BlogStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: '#4F922F'
  },
  tabBarLabel: 'Blog',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-book` : 'md-book'}
    />
  )
};

export default createBottomTabNavigator({
  SchoolsStack,
  BlogStack,
});
