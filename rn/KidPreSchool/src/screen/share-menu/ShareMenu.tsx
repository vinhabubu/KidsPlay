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
import { useDispatch, useSelector } from 'react-redux';

import getImage from '~/libs/getImage';

import Header from '~/components/header/Header';
import useRandomQuestion from '~/components/look-and-choose/RandomQuestion';
import { DataFull } from '~/data/DataFull';
// import { RandomQuestion } from '~/components/look-and-choose/RandomQuestion';
import { DataMenu } from '~/data/DataMenu';
import { ShareMenuPageNavProps } from '~/navigators/RootNavigator';
import { useKidsPreSchoolSlice } from '~/redux/slice';
import { selectIdHome } from '~/redux/slice/selectors';

const { height, width } = Dimensions.get('window');

const ShareMenu = () => {
  const navigation = useNavigation<ShareMenuPageNavProps>();
  const dispatch = useDispatch();
  const { actions } = useKidsPreSchoolSlice();
  const idHome = useSelector(selectIdHome);
  // const dataQuestion = DataFull[idMenu];
  // const { randomQuestion, randomAnswer } = useRandomQuestion();
  const renderItem = ({ item }: { item: MenuInFo }) => {
    // console.log(item);
    const handleClick = (item: MenuInFo) => {
      const dataQuestion = DataFull[item.id!];
      const itemRandom = [...dataQuestion].sort(() => 0.5 - Math.random());
      const items = itemRandom.slice(0, 4);
      // console.log('2', items);
      const item1 = items[Math.floor(Math.random() * items.length)];
      dispatch(actions.changeIdMenu(item.id!));
      if (idHome === '0') {
        navigation.navigate('StartLearningPage');
      }
      if (idHome === '2') {
        // dispatch(actions.changeIdMenu(item.id!));
        // RandomQuestion(item.id);
        dispatch(actions.randomQuestion(items));
        dispatch(actions.randomAnswer(item1));
        navigation.navigate('LookAndChoosePage');
      }
      if (idHome === '3') {
        dispatch(actions.randomQuestion(items));
        dispatch(actions.randomAnswer(item1));
        navigation.navigate('ListenAndGuessPage');
      }
    };
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <FastImage style={styles.image} source={item?.image} />
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
