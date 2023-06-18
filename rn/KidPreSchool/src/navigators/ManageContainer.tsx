import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import DetailContent from '~/screen/manager/content/DetailContent';
import HomeContent from '~/screen/manager/content/HomeContent';

// import TestPage from '~/screens/TestPage';

const StackNavigator = createStackNavigator<ManageNavigatorProps>();
const screenOptions = { headerShown: false };

export type ManageNavigatorProps = {
  ContentPage: undefined;
  DetailContentPage: undefined;
};

export type ContentPageNavProps = StackNavigationProp<
  ManageNavigatorProps,
  'ContentPage'
>;

export type DetailContentPageNavProps = StackNavigationProp<
  ManageNavigatorProps,
  'DetailContentPage'
>;

export type ContentPageRouteProps = RouteProp<
  ManageNavigatorProps,
  'ContentPage'
>;

export type DetailContentPageRouteProps = RouteProp<
  ManageNavigatorProps,
  'DetailContentPage'
>;

const ManageNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='ContentPage'>
      {/* <StackNavigator.Screen name='TestPage' component={TestPage} /> */}
      <StackNavigator.Screen
        name='ContentPage'
        component={HomeContent}
        // options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default ManageNavigator;
