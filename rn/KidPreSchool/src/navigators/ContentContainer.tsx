import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import Content from '~/screen/manager/content/Content';
import DetailContent from '~/screen/manager/content/DetailContent';
import EditContentPage from '~/screen/manager/content/Edit/EditContentPage';
import HomeContent from '~/screen/manager/content/HomeContent';

// import TestPage from '~/screens/TestPage';

const StackNavigator = createStackNavigator<ContentNavigatorProps>();
const screenOptions = { headerShown: false };

export type ContentNavigatorProps = {
  ContentPage: undefined;
  DetailContentPage: undefined;
  EditContentPage: undefined;
};

export type ContentPageNavProps = StackNavigationProp<
  ContentNavigatorProps,
  'ContentPage'
>;

export type DetailContentPageNavProps = StackNavigationProp<
  ContentNavigatorProps,
  'DetailContentPage'
>;

export type EditContentPageNavProps = StackNavigationProp<
  ContentNavigatorProps,
  'EditContentPage'
>;

export type ContentPageRouteProps = RouteProp<
  ContentNavigatorProps,
  'ContentPage'
>;

export type DetailContentPageRouteProps = RouteProp<
  ContentNavigatorProps,
  'DetailContentPage'
>;

const ContentNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='ContentPage'>
      {/* <StackNavigator.Screen name='TestPage' component={TestPage} /> */}
      <StackNavigator.Screen
        name='ContentPage'
        component={Content}
        // options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='DetailContentPage'
        component={DetailContent}
        // options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='EditContentPage'
        component={EditContentPage}
        // options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default ContentNavigator;
