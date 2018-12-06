import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import BlogScreen from '../screens/BlogScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Schools',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-school` : 'md-school'}
    />
  )
};

const BlogStack = createStackNavigator({
  Blogs: BlogScreen
});

BlogStack.navigationOptions = {
  tabBarLabel: 'Blog',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-book` : 'md-book'}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  BlogStack
});
