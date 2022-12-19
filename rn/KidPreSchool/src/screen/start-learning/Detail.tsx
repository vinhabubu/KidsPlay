import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import getImage from '~/libs/getImage';

import { DataFull } from '~/data/DataFull';
import { selectIdMenu, selectImageDetail } from '~/redux/slice/selectors';

const { width } = Dimensions.get('window');

const Detail = () => {
  const idMenu = useSelector(selectIdMenu);
  const imageDetail = useSelector(selectImageDetail);
  // console.log('1', idMenu);
  const dataLearning = DataFull[idMenu];
  // const dataDetail = dataLearning.filter((x) => x.image === imageDetail);
  const navigation = useNavigation();
  // console.log(dataLearning);
  const index = dataLearning.findIndex((x) => x.image === imageDetail);
  const [display, setDisplay] = useState(index);
  // console.log(index);
  // setDisplay(dataLearning[index]);

  // useEffect(() => {
  //   setDisplay(index);
  // }, []);

  const handleNext = () => {
    if (display < dataLearning.length - 1) {
      setDisplay(display + 1);
      // console.log(index);
    }
  };
  const handlePrev = () => {
    if (display > 0) {
      setDisplay(display - 1);
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={getImage('bgview')}
      resizeMode='cover'>
      <SafeAreaView>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FastImage style={styles.imageBack} source={getImage('btnback')} />
          </TouchableOpacity>
        </View>
        <View style={styles.textcontain}>
          <Text style={styles.text}>{dataLearning[display]?.tittle}</Text>
        </View>
        <View style={styles.Igcontain}>
          <TouchableOpacity onPress={() => handlePrev()}>
            <FastImage style={styles.arrowImage} source={getImage('btnprev')} />
          </TouchableOpacity>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={styles.image}
            source={dataLearning[display]?.image}
          />
          <TouchableOpacity onPress={() => handleNext()}>
            <FastImage style={styles.arrowImage} source={getImage('btnnext')} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000000',
    // justifyContent: 'space-around'
  },
  back: {
    paddingLeft: 6,
  },
  textcontain: {
    paddingTop: 40,
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
  },
  Igcontain: {
    // backgroundColor: '#FFFFFF',
    // justifyContent: 'space-around',
    // // padding: 20
    // margin: 16,
    // borderRadius: 10,
    paddingTop: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingBottom: 100,
  },
  image: {
    // backgroundColor: '#000000',
    width: width * 0.45,
    aspectRatio: 1 / 1,
    // margin: 0,
    // flex: 2,
  },
  arrowImage: {
    height: 66,
    width: 66,
  },
  imageBack: {
    height: 44,
    width: 44,
  },
});

export default Detail;
