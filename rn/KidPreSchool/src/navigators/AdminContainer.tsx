import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import UserDetailPage from '~/screen/admin/UseDetailPage';
import UserAdminPage from '~/screen/admin/UserAdminPage';
import DetailContent from '~/screen/manager/content/DetailContent';
import HomeContent from '~/screen/manager/content/HomeContent';

// import TestPage from '~/screens/TestPage';

const StackNavigator = createStackNavigator<AdminNavigatorProps>();
const screenOptions = { headerShown: false };

export type AdminNavigatorProps = {
  AdminUserPage: undefined;
  UserDetailPage: undefined;
};

export type AdminUserPageNavProps = StackNavigationProp<
  AdminNavigatorProps,
  'AdminUserPage'
>;

export type UserDetailPageNavProps = StackNavigationProp<
  AdminNavigatorProps,
  'UserDetailPage'
>;

const AdminNavigator = (): JSX.Element => {
  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='AdminUserPage'>
      {/* <StackNavigator.Screen name='TestPage' component={TestPage} /> */}
      <StackNavigator.Screen
        name='AdminUserPage'
        component={UserAdminPage}
        // options={{ gestureEnabled: false }}
      />
      <StackNavigator.Screen
        name='UserDetailPage'
        component={UserDetailPage}
        // options={{ gestureEnabled: false }}
      />
    </StackNavigator.Navigator>
  );
};

export default AdminNavigator;
