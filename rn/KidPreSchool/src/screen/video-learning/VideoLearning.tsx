import { useNavigation } from '@react-navigation/native';
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
import { VideoLearningPageNavProps } from '~/navigators/RootNavigator';

const { height, width } = Dimensions.get('window');
const VideoLearning = () => {
  const dataVideo = DataVideo.filter((x) => x.name === 'ABC Songs');
  const navigation = useNavigation<VideoLearningPageNavProps>();
  const renderItem = ({ item }: { item: any }) => {
    // console.log(item?.data);

    const splitted = item?.data.split('#');
    const idYoutube = splitted[0];
    // console.log('1', idYoutube);
    const titleVideo = splitted[1];
    const handleClick = (item: any) => {
      console.log('1', item);
      navigation.navigate('VideoPage');
    };
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <SafeAreaView style={styles.borderShadow}>
          <FastImage
            style={styles.image}
            resizeMode='stretch'
            source={{
              uri: `https://i3.ytimg.com/vi/${idYoutube}/maxresdefault.jpg`,
            }}
          />
          <Text style={styles.title}>{titleVideo}</Text>
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
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 4,
    // padding: 10,
    // margin: 10,
  },

  image: {
    width: width * 0.47,
    aspectRatio: 1 / 0.5,
    borderRadius: 2,
    // overflow: 'hidden',
    // margin: height * 0.023,
  },
  title: {
    width: width * 0.47,
    fontSize: 15,
    padding: 4,
  },
});
export default VideoLearning;
