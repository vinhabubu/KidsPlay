import React, { useState } from 'react';
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

import getImage from '~/libs/getImage';

import Header from '~/components/header/Header';
import { DataVideo } from '~/data/DataVideo';
import { DataVideoMenu } from '~/data/DataVideoMenu';
import { defaultTheme } from '~/theme/theme';

const { width } = Dimensions.get('window');

const DetailVideo = () => {
  const dataVideo = DataVideo.filter((x) => x.name === 'ABC Songs');
  const [data, setData] = useState(dataVideo);

  const handleDelete = (item: any) => {};

  const renderItem = ({ item }: { item: LearningInFo }) => {
    const splitted = item?.data.split('#');
    const idYoutube = splitted[0];
    // console.log(splitted);
    // console.log(item);
    return (
      <TouchableOpacity style={styles.list}>
        <View style={styles.bgImage}>
          <View style={styles.name}>
            <FastImage
              style={styles.image}
              source={{
                uri: `https://i3.ytimg.com/vi/${idYoutube}/maxresdefault.jpg`,
              }}
            />
            <Text style={styles.text}>{splitted[1]}</Text>
          </View>
          <View style={styles.change}>
            <TouchableOpacity style={styles.edit}>
              <Text style={styles.textEdit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => handleDelete(item)}>
              <Text style={styles.textEdit}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text style={styles.text}>{item.tittle}</Text> */}
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
            // columnWrapperStyle={styles.column}
            // showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={renderItem}
            // keyExtractor={(item) => item.name}
            // numColumns={2}
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
  list: {
    flex: 1,
    // backgroundColor: '#000000',
    // justifyContent: 'space-around'
    // flexDirection: 'row',
    marginTop: 12,
    marginRight: 8,
    marginLeft: 8,
  },
  bgImage: {
    backgroundColor: defaultTheme.colors.background,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 20
    // margin: 16,
    borderRadius: 10,
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-around',
    marginRight: 12,
  },
  edit: {
    backgroundColor: '#42b883',
    borderRadius: 8,
  },
  textEdit: {
    margin: 4,
    marginLeft: 10,
    marginRight: 10,
    color: defaultTheme.colors.background,
    fontSize: 14,
    fontWeight: '900',
    // borderRadius: 12,
  },
  delete: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    marginLeft: 12,
  },
  column: {
    justifyContent: 'space-evenly',
    marginTop: 18,
  },
  image: {
    // backgroundColor: '#000000',
    width: width * 0.16,
    // height: width * 0.14,

    // margin: 50,
    aspectRatio: 1 / 1,
    margin: width * 0.02,
    // flex: 1,
    resizeMode: 'stretch',
  },
  text: {
    fontSize: 8,
    color: '#000000',
    // backgroundColor: 'red',
  },
});
export default DetailVideo;
