import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import getImage from '~/libs/getImage';

import { DataFull } from '~/data/DataFull';
import { DataMenu } from '~/data/DataMenu';
import { selectIdHome, selectIdMenu } from '~/redux/slice/selectors';
import { defaultTheme } from '~/theme/theme';

const Header = () => {
  const navigation = useNavigation();

  // console.log(actionButtonState.result?.dataField);
  const [title, setTitle] = useState('');
  const router = useRoute();
  const idHome = useSelector(selectIdHome);
  const idMenu = useSelector(selectIdMenu);
  // console.log(idMenu);
  // const dataHeader = DataMenu.filter((x) => x.id === idMenu);
  // console.log('1', dataHeader);
  useEffect(() => {
    if (router.name === 'HomePage') {
      setTitle('Kids Play');
    }
    if (router.name === 'ShareMenuPage') {
      if (idHome === '0') {
        setTitle('Preschool Kids Learning');
      }
      if (idHome === '2') {
        setTitle('Look and Choose Quiz');
      }
      if (idHome === '3') {
        setTitle('Listen and Guess');
      }
    }
    if (
      router?.name === 'StartLearningPage' ||
      router?.name === 'LookAndChoosePage' ||
      router?.name === 'ListenAndGuessPage'
    ) {
      const dataHeader = DataMenu.filter((x) => x?.id === idMenu);
      setTitle(dataHeader[0]?.name);
    }
  }, [router]);

  return (
    <View>
      {router.name === 'HomePage' ? (
        <View style={styles.container}>
          <Text />
          <Text style={styles.textHome}>{title}</Text>
          <FastImage style={styles.image} source={getImage('setting')} />
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FastImage style={styles.image} source={getImage('btnback')} />
          </TouchableOpacity>
          <Text style={styles.text}>{title}</Text>
          <Text />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: defaultTheme.colors.default,
    // justifyContent: 'space-around'
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    // font: defaultTheme.fonts.regular,
    paddingRight: 24,
    color: defaultTheme.colors.headbar,
  },
  textHome: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 28,
    color: defaultTheme.colors.headbar,
  },
  image: {
    height: 40,
    width: 40,
  },
});

export default Header;
