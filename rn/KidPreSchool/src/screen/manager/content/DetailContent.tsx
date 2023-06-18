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
import { useSelector } from 'react-redux';

import getImage from '~/libs/getImage';

import Header from '~/components/header/Header';
import { DataFull } from '~/data/DataFull';
import { DataMenu } from '~/data/DataMenu';
import useModalManager from '~/hook/useModalManager';
import { selectIdMenu } from '~/redux/slice/selectors';
import { defaultTheme } from '~/theme/theme';

const { width } = Dimensions.get('window');

const DetailContent = () => {
  const idMenu = useSelector(selectIdMenu);
  // console.log('1', idMenu);
  const dataLearning = DataFull[idMenu];
  // console.log(dataLearning);
  const [data, setData] = useState(dataLearning);
  const { openModal } = useModalManager();

  const renderItem = ({ item }: { item: LearningInFo }) => {
    // console.log(item);

    const handleDelete = () => {};
    const handleUpdate = () => {
      // console.log('1111');
      openModal('ExampleModal');
    };
    return (
      <TouchableOpacity style={styles.list}>
        <View style={styles.bgImage}>
          <View style={styles.name}>
            <FastImage style={styles.image} source={item.image} />
            <Text style={styles.text}>{item.tittle}</Text>
          </View>
          <View style={styles.change}>
            <TouchableOpacity
              style={styles.edit}
              onPress={() => handleUpdate()}>
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
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    color: '#000000',
    // backgroundColor: 'red',
  },
});
export default DetailContent;
