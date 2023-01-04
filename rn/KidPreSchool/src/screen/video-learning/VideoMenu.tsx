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
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import getImage from '~/libs/getImage';

import Header from '~/components/header/Header';
import { DataVideoMenu } from '~/data/DataVideoMenu';
import { VideoMenuPageNavProps } from '~/navigators/RootNavigator';
import { useKidsPreSchoolSlice } from '~/redux/slice';

const { height, width } = Dimensions.get('window');

const VideoMenu = () => {
  const navigation = useNavigation<VideoMenuPageNavProps>();
  const dispatch = useDispatch();
  const { actions } = useKidsPreSchoolSlice();
  // const idHome = useSelector(selectIdHome);
  // const dataQuestion = DataFull[idMenu];
  // const { randomQuestion, randomAnswer } = useRandomQuestion();

  const handleClick = (item: MenuInFo) => {
    // console.log(item);
    navigation.navigate('VideoLearningPage');
    dispatch(actions.changeIdMenu(item.id!));
  };
  const renderItem = ({ item }: { item: MenuInFo }) => {
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <FastImage
          style={styles.image}
          resizeMode='stretch'
          source={item?.image}
        />
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
          data={DataVideoMenu}
          renderItem={renderItem}
          // keyExtractor={(item) => item.name}
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
  image: {
    width: width * 0.4,
    aspectRatio: 1 / 1,
    // margin: height * 0.023,
  },
});

export default VideoMenu;
