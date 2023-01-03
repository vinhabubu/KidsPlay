import React, { useState } from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';

import Header from '~/components/header/Header';
import { DataVideo } from '~/data/DataVideo';

const { height, width } = Dimensions.get('window');
const VideoLearning = () => {
  const dataVideo = DataVideo.filter((x) => x.id === 0);

  const renderItem = ({ item }: { item: any }) => {
    // console.log(item?.data);
    const splitted = item?.data.split('#');
    const idYoutube = splitted[0];
    // console.log('1', idYoutube);
    const titleVideo = splitted[1];
    return (
      <TouchableOpacity>
        <SafeAreaView style={styles.borderShadow}>
          <View style={styles.content}>
            <FastImage
              style={styles.image}
              resizeMode='stretch'
              source={{
                uri: `https://i3.ytimg.com/vi/${idYoutube}/maxresdefault.jpg`,
              }}
            />
            <Text style={styles.title}>{titleVideo}</Text>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SafeAreaView style={styles.container}>
        <FlatList
          // horizontal={true}
          columnWrapperStyle={styles.column}
          showsHorizontalScrollIndicator={false}
          data={dataVideo}
          renderItem={renderItem}
          numColumns={2}
        />

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
  borderShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  content: {
    // // width: 200,
    // // height: 200,
    // shadowRadius: 2,
    // // borderWidth: 4,
    // // borderColor: "white",
    // overflow: 'hidden',
    // elevation: 0.8,
  },
  image: {
    width: width * 0.45,
    aspectRatio: 1 / 0.5,
    // margin: height * 0.023,
  },
  title: {
    width: width * 0.45,
    fontSize: 15,
    padding: 4,
  },
});
export default VideoLearning;
