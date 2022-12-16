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
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import getImage from '~/libs/getImage';

import Header from '~/components/header/Header';
import { DataMenu } from '~/data/DataMenu';
import { useGithubRepoFormSlice } from '~/redux/slice';

const { height, width } = Dimensions.get('window');

const ShareMenu = () => {
  const dispatch = useDispatch();
  const { actions } = useGithubRepoFormSlice();
  const renderItem = ({ item }: { item: MenuInFo }) => {
    // console.log(item);
    const handleClick = (item: MenuInFo) => {
      dispatch(actions.changeIdMenu(item.id!));
    };
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <FastImage style={styles.image} source={item.image} />
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
            data={DataMenu}
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
  column: {
    justifyContent: 'space-around',
    marginTop: 16,
  },
  image: {
    width: width * 0.4,
    height: height * 0.22,
    // margin: height * 0.023,
  },
});

export default ShareMenu;
