import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';

import Home from '~/screen/home/Home';
import ListenAndGuess from '~/screen/listen-and-guess/ListenAndGuess';
import LookAndChoose from '~/screen/look-and-choose/LookAndChoose';
import Setting from '~/screen/setting/Setting';
import ShareMenu from '~/screen/share-menu/ShareMenu';
import Splash from '~/screen/splash/Splash';
import Detail from '~/screen/start-learning/Detail';
import StartLearning from '~/screen/start-learning/StartLearning';
import { Test } from '~/screen/test/test';
import VideoLearning from '~/screen/video-learning/VideoLearning';
import VideoMenu from '~/screen/video-learning/VideoMenu';

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
  SettingPage: undefined;
  VideoMenuPage: undefined;
  VideoLearningPage: undefined;
  TestPage: undefined;
};

export type HomePageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'HomePage'
>;

export type SettingPageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'SettingPage'
>;

export type VideoMenuPageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'VideoMenuPage'
>;

export type VideoLearningPageNavProps = StackNavigationProp<
  RootNavigatorProps,
  'VideoLearningPage'
>;

export type HomePageRouteProps = RouteProp<RootNavigatorProps, 'HomePage'>;
export type SettingPageRouteProps = RouteProp<
  RootNavigatorProps,
  'SettingPage'
>;

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

export type VideoMenuPageProps = StackNavigationProp<
  RootNavigatorProps,
  'VideoMenuPage'
>;

export type VideoLearningPageProps = StackNavigationProp<
  RootNavigatorProps,
  'VideoLearningPage'
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
  // const renderHomeUI = isPortrait ? HomePage : HomePageLandscape;
  // useEffect(() => {
  //   isRotate = true;
  //   actionMethod.setActionRotate?.(isRotate);
  // }, [isPortrait]);
  // setTimeout(() => {
  //   isRotate = false;
  //   actionMethod.setActionRotate?.(isRotate);
  // });

  const leftToRightAnimation = {
    cardStyleInterpolator: ({
      current,
      layouts,
    }: {
      current: any;
      layouts: any;
    }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
              }),
            },
          ],
        },
      };
    },
  };

  return (
    <StackNavigator.Navigator
      screenOptions={screenOptions}
      initialRouteName='SplashPage'>
      <StackNavigator.Screen
        name='HomePage'
        component={Home}
        options={leftToRightAnimation}
      />
      <StackNavigator.Screen
        name='SettingPage'
        component={Setting}
        options={leftToRightAnimation}
      />
      <StackNavigator.Screen name='SplashPage' component={Splash} />
      <StackNavigator.Screen
        name='ShareMenuPage'
        component={ShareMenu}
        options={leftToRightAnimation}
      />
      <StackNavigator.Screen
        name='VideoLearningPage'
        component={VideoLearning}
      />
      <StackNavigator.Screen
        name='StartLearningPage'
        component={StartLearning}
        options={leftToRightAnimation}
      />
      <StackNavigator.Screen name='DetailPage' component={Detail} />
      <StackNavigator.Screen
        name='LookAndChoosePage'
        component={LookAndChoose}
        options={leftToRightAnimation}
      />
      <StackNavigator.Screen
        name='ListenAndGuessPage'
        component={ListenAndGuess}
        options={leftToRightAnimation}
      />
      <StackNavigator.Screen
        name='VideoMenuPage'
        component={VideoMenu}
        options={leftToRightAnimation}
      />
      <StackNavigator.Screen name='TestPage' component={Test} />
    </StackNavigator.Navigator>
  );
};

export default RootNavigator;
