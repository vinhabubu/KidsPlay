import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';

import ContentNavigator from '~/navigators/ContentContainer';
import VideoContentNavigator from '~/navigators/VideoContentContainer';

import Content from './Content';
import Video from './Video';

const Tab = createBottomTabNavigator();
const HomeContent = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        headerShown: false,
        // tabBarScrollEnabled: true,
        tabBarLabelStyle: { fontSize: 16 },
        // tabBarItemStyle: { width: 150 },
        tabBarStyle: {
          // height: 40,
          backgroundColor: '#CCCC00',
        },
      }}>
      <Tab.Screen
        name='Content'
        component={ContentNavigator}
        options={{
          // tabBarLabel: 'Content',
          tabBarIcon: ({ focused }) => (
            //  https://reactnavigation.org/docs/bottom-tab-navigator/#tabbaricon
            <Image
              fadeDuration={0}
              style={{ width: 22, height: 22 }}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Video'
        component={VideoContentNavigator}
        options={{
          // tabBarLabel: 'Video',
          tabBarIcon: ({ focused }) => (
            //  https://reactnavigation.org/docs/bottom-tab-navigator/#tabbaricon
            <Image
              fadeDuration={0}
              style={{ width: 22, height: 22 }}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeContent;
