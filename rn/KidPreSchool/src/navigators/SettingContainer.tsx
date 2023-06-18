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
import Profile from '~/screen/setting/Profile';
import Setting from '~/screen/setting/Setting';

// import TestPage from '~/screens/TestPage';

const StackNavigator = createStackNavigator<SettingNavigatorProps>();
const screenOptions = { headerShown: false };

export type SettingNavigatorProps = {
  SettingDetailPage: undefined;
  ProfilePage: undefined;
  EditContentPage: undefined;
};

export type SettingDetailPageNavProps = StackNavigationProp<
  SettingNavigatorProps,
  'SettingDetailPage'
>;

export type ProfilePageNavProps = StackNavigationProp<
  SettingNavigatorProps,
  'ProfilePage'
>;

const SettingNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='SettingDetailPage'>
      {/* <StackNavigator.Screen name='TestPage' component={TestPage} /> */}
      <StackNavigator.Screen
        name='SettingDetailPage'
        component={Setting}
        // options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='ProfilePage'
        component={Profile}
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

export default SettingNavigator;
