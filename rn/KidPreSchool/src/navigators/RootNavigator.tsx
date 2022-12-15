import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useEffect } from 'react';

import Home from '~/screen/home/Home';
import ShareMenu from '~/screen/share-menu/ShareMenu';
import Splash from '~/screen/splash/Splash';

// import TestPage from '~/screens/TestPage';

const StackNavigator = createStackNavigator<RootNavigatorProps>();
const screenOptions = { headerShown: false };

export type RootNavigatorProps = {
  SplashPage: undefined;
  HomePage: undefined;
  ShareMenuPage: undefined;
  TestPage: undefined;
  DetailPage: undefined;
  FullScreenPage: undefined;
  LookChoosePage: undefined;
  ListenGuessPage: undefined;
};

export type HomePageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'HomePage'
>;

export type HomePageRouteProps = RouteProp<RootNavigatorProps, 'HomePage'>;

export type SplashPageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'SplashPage'
>;

export type LearningPageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'ShareMenuPage'
>;

export type FullScreenPageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'FullScreenPage'
>;

export type DetailPageProps = StackNavigationProp<
  RootNavigatorProps,
  'DetailPage'
>;

export type LookChooseExamPageProps = StackNavigationProp<
  RootNavigatorProps,
  'LookChoosePage'
>;

export type ListenGuessExamPageProps = StackNavigationProp<
  RootNavigatorProps,
  'ListenGuessPage'
>;

export type SplashPageRouteProps = RouteProp<RootNavigatorProps, 'SplashPage'>;
export type ShareMenuRouteProps = RouteProp<
  RootNavigatorProps,
  'ShareMenuPage'
>;
export type FullScreenRouteProps = RouteProp<
  RootNavigatorProps,
  'FullScreenPage'
>;
export type DetailRouteProps = RouteProp<RootNavigatorProps, 'DetailPage'>;
export type LookChooseRouteProps = RouteProp<
  RootNavigatorProps,
  'LookChoosePage'
>;
export type ListenGuessRouteProps = RouteProp<
  RootNavigatorProps,
  'ListenGuessPage'
>;

const RootNavigator = (): JSX.Element => {
  const isRotate = false;

  // const renderHomeUI = isPortrait ? HomePage : HomePageLandscape;
  // useEffect(() => {
  //   isRotate = true;
  //   actionMethod.setActionRotate?.(isRotate);
  // }, [isPortrait]);
  // setTimeout(() => {
  //   isRotate = false;
  //   actionMethod.setActionRotate?.(isRotate);
  // });

  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='SplashPage'>
      <StackNavigator.Screen name='HomePage' component={Home} />
      <StackNavigator.Screen name='SplashPage' component={Splash} />
      <StackNavigator.Screen name='ShareMenuPage' component={ShareMenu} />
    </StackNavigator.Navigator>
  );
};

export default RootNavigator;
