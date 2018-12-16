import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SchoolsScreen from '../screens/SchoolsScreen';
import BlogScreen from '../screens/BlogScreen';
import PostScreen from '../screens/PostScreen';
import SchoolScreen from '../screens/SchoolScreen';
import ContactScreen from '../screens/ContactScreen';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  School: SchoolScreen
});

HomeStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: '#4F922F'
  },
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
    />
  )
};

const SchoolsStack = createStackNavigator({
  Schools: SchoolsScreen,
  School: SchoolScreen,
  Contact: ContactScreen
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
  Blog: BlogScreen,
  Post: PostScreen
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
  HomeStack,
  SchoolsStack,
  BlogStack
});
