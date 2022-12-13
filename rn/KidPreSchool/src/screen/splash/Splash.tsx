import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';

import getImage from '~/libs/getImage';

import { SplashPageNavProps } from '~/navigators/RootNavigator';

const Splash = (): JSX.Element => {
  const navigation = useNavigation<SplashPageNavProps>();

  const [progress, setProgress] = useState(0);
  const [indeterminate, setIndeterminate] = useState(true);

  useEffect(() => {
    let loading = 0;
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

      navigation.navigate('HomePage');
      // }, 2000);
    };
  }, [progress]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        resizeMode='cover'
        source={getImage('splash')}
        style={styles.image}
      />
      {/* <FastImage style={styles.image} source={getImage('alphabet')} /> */}
    </SafeAreaView>
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
