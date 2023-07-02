import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import getImage from '~/libs/getImage';

import { SplashPageNavProps } from '~/navigators/RootNavigator';
import { useKidsPreSchoolSlice } from '~/redux/slice';

const Splash = (): JSX.Element => {
  const navigation = useNavigation<SplashPageNavProps>();

  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);
  const dispatch = useDispatch();
  const { actions } = useKidsPreSchoolSlice();

  useEffect(() => {
    let loading = 0;

    let firstCount: any;

    const loadPurchase = async () => {
      const userAccount = AsyncStorage.getItem('AccountUser');
      const FirstOpen = await userAccount;
      if (FirstOpen === null) {
        firstCount = null;
      } else if (FirstOpen !== null) {
        firstCount = JSON.parse(FirstOpen);
        // console.log(typeof FirstOpen);
      }
      // console.log('11', firstCount);
      // firstCount = JSON.parse(userAccount);
    };
    loadPurchase();
    const timeout = setTimeout(async () => {
      setIndeterminate(false);
      await setInterval(() => {
        // loading += Math.random() / 5;
        // if (loading > 1) {
        loading = 1;
        // }
        setProgress(loading);
      });
    }, 2000);

    return () => {
      clearTimeout(timeout);
      dispatch(actions.changeDataUser(firstCount));
      if (firstCount === null) {
        navigation.navigate('LoginPage');
      } else if (firstCount.isAdmin) {
        navigation.navigate('AdminContainerPage');
      } else if (firstCount.isManager) {
        navigation.navigate('ManagePage');
      } else {
        navigation.navigate('HomePage');
      }
      // navigation.navigate('HomePage');
      // }, 2000);
    };
  }, [progress]);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode='cover'
        source={getImage('splash')}
        style={styles.image}
      />
      {/* <FastImage style={styles.image} source={getImage('alphabet')} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000000',
    // justifyContent: 'space-around'
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Splash;
