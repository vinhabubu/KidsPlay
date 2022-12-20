import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

import getImage from '~/libs/getImage';

import Header from '~/components/header/Header';
import { DataFull } from '~/data/DataFull';
import { StartLearningPageNavProps } from '~/navigators/RootNavigator';
import { useKidsPreSchoolSlice } from '~/redux/slice';
import { selectIdMenu } from '~/redux/slice/selectors';
import { defaultTheme } from '~/theme/theme';

const { width } = Dimensions.get('window');

const StartLearning = () => {
  const idMenu = useSelector(selectIdMenu);
  // console.log('1', idMenu);
  const dataLearning = DataFull[idMenu];
  const dispatch = useDispatch();
  const navigation = useNavigation<StartLearningPageNavProps>();
  const { actions } = useKidsPreSchoolSlice();
  // console.log(dataLearning);
  const handleClick = (item: LearningInFo) => {
    dispatch(actions.changeImageDetail(item.image!));
    navigation.navigate('DetailPage');
  };
  const renderItem = ({ item }: { item: LearningInFo }) => {
    // console.log(item);
    return (
      <TouchableOpacity
        onPress={() => {
          handleClick(item);
        }}>
        <View style={styles.bgImage}>
          <FastImage style={styles.image} source={item.image} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SafeAreaView style={styles.container}>
        <ImageBackground resizeMode='cover' source={getImage('bgmain')}>
          <FlatList
            // horizontal={true}
            columnWrapperStyle={styles.column}
            showsHorizontalScrollIndicator={false}
            data={dataLearning}
            renderItem={renderItem}
            // keyExtractor={(item) => item.name}
            numColumns={2}
          />
        </ImageBackground>
        {/* <FastImage style={styles.image} source={getImage('alphabet')} /> */}
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000000',
    // justifyContent: 'space-around'
  },
  bgImage: {
    backgroundColor: defaultTheme.colors.background,
    // justifyContent: 'space-around',
    // padding: 20
    // margin: 16,
    borderRadius: 10,
  },
  column: {
    justifyContent: 'space-evenly',
    marginTop: 18,
  },
  image: {
    // backgroundColor: '#000000',
    width: width * 0.34,
    // margin: 50,
    aspectRatio: 1 / 1,
    margin: width * 0.04,
    flex: 1,
    resizeMode: 'stretch',
  },
});

export default StartLearning;
