import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import Content from '~/screen/manager/content/Content';
import DetailContent from '~/screen/manager/content/DetailContent';
import DetailVideo from '~/screen/manager/content/DetailVideo';
import EditVideoPage from '~/screen/manager/content/Edit/EditVideoPage';
import HomeContent from '~/screen/manager/content/HomeContent';
import Video from '~/screen/manager/content/Video';

// import TestPage from '~/screens/TestPage';

const StackNavigator = createStackNavigator<VideoContentNavigatorProps>();
const screenOptions = { headerShown: false };

export type VideoContentNavigatorProps = {
  VideoContentPage: undefined;
  VideoDetailContentPage: undefined;
  EditVideoPage: undefined;
};

export type VideoContentPageNavProps = StackNavigationProp<
  VideoContentNavigatorProps,
  'VideoContentPage'
>;

export type VideoDetailContentPageNavProps = StackNavigationProp<
  VideoContentNavigatorProps,
  'VideoDetailContentPage'
>;

export type VideoContentPageRouteProps = RouteProp<
  VideoContentNavigatorProps,
  'VideoContentPage'
>;

export type VideoDetailContentPageRouteProps = RouteProp<
  VideoContentNavigatorProps,
  'VideoDetailContentPage'
>;

const VideoContentNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='VideoContentPage'>
      {/* <StackNavigator.Screen name='TestPage' component={TestPage} /> */}
      <StackNavigator.Screen
        name='VideoContentPage'
        component={Video}
        // options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='VideoDetailContentPage'
        component={DetailVideo}
        // options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='EditVideoPage'
        component={EditVideoPage}
        // options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default VideoContentNavigator;
