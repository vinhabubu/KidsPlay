import React, { useCallback, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';

import { DataVideo } from '~/data/DataVideo';

const { height, width } = Dimensions.get('window');
const Video = () => {
  const dataVideo = DataVideo.filter((x) => x.name === 'ABC Songs');
  const renderItem = ({ item }: { item: any }) => {
    // console.log(item?.data);

    const splitted = item?.data.split('#');
    const idYoutube = splitted[0];
    // console.log('1', idYoutube);
    const titleVideo = splitted[1];
    const handleClick = () => {
      // console.log(1);
    };
    return (
      <TouchableOpacity onPress={() => handleClick()}>
        <View style={styles.itemVideo}>
          <SafeAreaView style={styles.borderShadow}>
            <FastImage
              style={styles.image}
              resizeMode='cover'
              source={{
                uri: `https://i3.ytimg.com/vi/${idYoutube}/maxresdefault.jpg`,
              }}
            />
            <Text style={styles.title}>{titleVideo}</Text>
          </SafeAreaView>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <YoutubePlayer
          height={height * 0.38}
          play={true}
          videoId={'hq3yfQnllfQ'}
          // style={styles.video}
          // onChangeState={onStateChange}
        />
        <View style={styles.video}>
          <Text style={styles.titleVideo}>
            Phonics Song with TWO Words - A For Apple - ABC Alphabet Songs with
            Sounds for Children
          </Text>
        </View>
        <View style={styles.borderLine} />
      </View>
      <ScrollView>
        <FlatList
          // horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={dataVideo}
          renderItem={renderItem}
        />
        <View style={styles.paddingImage} />
        {/* <FastImage style={styles.image} source={getImage('alphabet')} /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    // backgroundColor: '#000000',
    // justifyContent: 'space-around'
  },
  video: {
    marginTop: -height / 10,
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
    flexDirection: 'row',
    // padding: 10,
    // margin: 10,
  },

  borderLine: {
    borderBottomColor: '#BEBEBE',
    borderBottomWidth: 4,
    width: width,
    height: 12,
  },
  itemVideo: {
    padding: 8,
  },
  titleVideo: {
    fontSize: 16,
    padding: 4,
  },
  title: {
    // width: width * 0.47,
    fontSize: 14,
    padding: 4,
    width: width / 1.8,
    // marginBottom: 30,
  },
  image: {
    width: width * 0.4,
    aspectRatio: 1 / 0.45,
    borderRadius: 2,
    // overflow: 'hidden',
    // margin: height * 0.023,
  },
  paddingImage: {
    paddingBottom: 2,
  },
});
export default Video;
