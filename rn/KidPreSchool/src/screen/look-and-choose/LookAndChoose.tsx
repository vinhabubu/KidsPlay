import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import getImage from '~/libs/getImage';

import Header from '~/components/header/Header';
import useRandomQuestion from '~/components/look-and-choose/RandomQuestion';
import {
  selectRandomAnswer,
  selectRandomQuestion,
} from '~/redux/slice/selectors';
import { defaultTheme } from '~/theme/theme';

const { height, width } = Dimensions.get('window');

const LookAndChoose = () => {
  // const idMenu = useSelector(selectIdMenu);
  // const dataQuestion = DataFull[idMenu];
  // const itemRandom = [...dataQuestion].sort(() => 0.5 - Math.random());
  // const items = itemRandom.slice(0, 4);
  // // console.log('2', items);
  // const item1 = items[Math.floor(Math.random() * items.length)].image;
  const randomQuestion = useSelector(selectRandomQuestion);
  const randomImageAnswer = useSelector(selectRandomAnswer);
  const [isTrue, setIsTrue] = useState(false);
  const [selectedKey, setSelectedKey] = useState(0);
  const { randomQuestionChoose, randomAnswer } = useRandomQuestion();
  // console.log('answer', randomImageAnswer);

  const handleClick = (item: LearningInFo) => {
    // console.log(item);
    setSelectedKey(item.image!);
    // console.log(item.image);
    // for (let data of items) {
    //     if (data.image == image) {
    //         data.selected = (data.selected == null) ? true : !data.selected;
    //         break;
    //     }
    // }
    if (item.image === randomImageAnswer) {
      setIsTrue(true);
    } else {
      setIsTrue(false);
    }
    // console.log('1', isTrue);
  };
  const renderItem = ({ item }: { item: LearningInFo }) => {
    return (
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <View
          style={item.image === selectedKey ? styleBgImage : styles.bgImage}>
          <Text style={styles.text}>{item.tittle}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const handleRandom = () => {
    setSelectedKey(0);
    randomAnswer();
    randomQuestionChoose();
  };

  const styleBgImage = useMemo<StyleProp<ViewStyle>>(
    () => ({
      backgroundColor: isTrue
        ? defaultTheme.colors.correct
        : defaultTheme.colors.error,
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 20
      aspectRatio: 3.2 / 2,
      width: width / 2.2,
      margin: 6,
      borderRadius: 10,
      // paddingLeft: 20,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isTrue],
  );
  return (
    <View style={styles.container}>
      <Header />
      <SafeAreaView style={styles.Examcontainer}>
        <View style={styles.flexImage}>
          <FastImage style={styles.image} source={randomImageAnswer} />
        </View>
        <View style={styles.flatList}>
          <FlatList
            // horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={randomQuestion}
            renderItem={renderItem}
            numColumns={2}
            style={styles.answers}
          />
          <View style={styles.arrow}>
            <TouchableOpacity onPress={() => handleRandom()}>
              <FastImage
                style={styles.arrowImage}
                source={getImage('btnprev')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleRandom()}>
              <FastImage
                style={styles.arrowImage}
                source={getImage('btnnext')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <FastImage style={styles.image} source={getImage('')} /> */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000000',
    // justifyContent: 'space-around'
  },
  flatList: {
    flex: 2,
  },
  answers: {
    paddingTop: height / 18,
  },
  bgImage: {
    backgroundColor: defaultTheme.colors.backgroundAnswer,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20
    aspectRatio: 3.2 / 2,
    width: width / 2.2,
    margin: 6,
    borderRadius: 10,
    // paddingLeft: 20,
  },
  Examcontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flexImage: {
    paddingTop: height / 4,
    flex: 1,
  },
  image: {
    // flex: 1,
    aspectRatio: 1 / 1,
    width: width / 3,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  arrow: {
    flexDirection: 'row',
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  arrowImage: {
    height: 60,
    width: 60,
  },
});

export default LookAndChoose;
