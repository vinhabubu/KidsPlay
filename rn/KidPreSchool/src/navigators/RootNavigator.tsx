import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React, { useEffect } from 'react';

import Home from '~/screen/home/Home';
import ListenAndGuess from '~/screen/listen-and-guess/ListenAndGuess';
import LookAndChoose from '~/screen/look-and-choose/LookAndChoose';
import ShareMenu from '~/screen/share-menu/ShareMenu';
import Splash from '~/screen/splash/Splash';
import Detail from '~/screen/start-learning/Detail';
import StartLearning from '~/screen/start-learning/StartLearning';

// import TestPage from '~/screens/TestPage';

const StackNavigator = createStackNavigator<RootNavigatorProps>();
const screenOptions = { headerShown: false };

export type RootNavigatorProps = {
  SplashPage: undefined;
  HomePage: undefined;
  ShareMenuPage: undefined;
  DetailPage: undefined;
  StartLearningPage: undefined;
  LookAndChoosePage: undefined;
  ListenAndGuessPage: undefined;
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

export type ShareMenuPageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'ShareMenuPage'
>;

export type StartLearningPageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'StartLearningPage'
>;

export type DetailPageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'DetailPage'
>;

export type LookChooseExamPageProps = StackNavigationProp<
  RootNavigatorProps,
  'LookAndChoosePage'
>;

export type ListenGuessExamPageProps = StackNavigationProp<
  RootNavigatorProps,
  'ListenAndGuessPage'
>;

export type SplashPageRouteProps = RouteProp<RootNavigatorProps, 'SplashPage'>;
export type ShareMenuRouteProps = RouteProp<
  RootNavigatorProps,
  'ShareMenuPage'
>;
export type StartLearningRouteProps = RouteProp<
  RootNavigatorProps,
  'StartLearningPage'
>;
export type DetailRouteProps = RouteProp<RootNavigatorProps, 'DetailPage'>;
export type LookChooseRouteProps = RouteProp<
  RootNavigatorProps,
  'LookAndChoosePage'
>;
export type ListenGuessRouteProps = RouteProp<
  RootNavigatorProps,
  'ListenAndGuessPage'
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
      <StackNavigator.Screen
        name='StartLearningPage'
        component={StartLearning}
      />
      <StackNavigator.Screen name='DetailPage' component={Detail} />
      <StackNavigator.Screen
        name='LookAndChoosePage'
        component={LookAndChoose}
      />
      <StackNavigator.Screen
        name='ListenAndGuessPage'
        component={ListenAndGuess}
      />
    </StackNavigator.Navigator>
  );
};

export default RootNavigator;
