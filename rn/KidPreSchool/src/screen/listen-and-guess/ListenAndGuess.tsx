import React, { useEffect, useMemo, useState } from 'react';
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
import Tts from 'react-native-tts';
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

const ListenAndGuess = () => {
  const randomQuestion = useSelector(selectRandomQuestion);
  const randomAnswer = useSelector(selectRandomAnswer);
  const [isTrue, setIsTrue] = useState(false);
  const [selectedKey, setSelectedKey] = useState(0);
  const { randomQuestionChoose, randomAnswerChoose } = useRandomQuestion();
  // console.log('answer', randomImageAnswer);
  Tts.setDefaultRate(0.1);
  Tts.setDefaultPitch(0.8);
  useEffect(() => {
    Tts.speak(randomAnswer?.sounds);
  }, [randomAnswer]);

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
    if (item?.image === randomAnswer?.image) {
      setIsTrue(true);
      Tts.speak('Correct answer');
    } else {
      setIsTrue(false);
      Tts.speak('Wrong answer');
    }
    // console.log('1', isTrue);
  };
  const renderItem = ({ item }: { item: LearningInFo }) => {
    return (
      <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <View
          style={item.image === selectedKey ? styleBgImage : styles.bgImage}>
          {/* <Text style={styles.text}>{item.tittle}</Text> */}
          <FastImage style={styles.imageAnswer} source={item?.image} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const handleRandom = () => {
    setSelectedKey(0);
    randomAnswerChoose();
    randomQuestionChoose();
  };

  const handleVoice = () => {
    Tts.speak(randomAnswer.sounds);
  };

  const styleBgImage = useMemo<StyleProp<ViewStyle>>(
    () => ({
      backgroundColor: isTrue
        ? defaultTheme.colors.correct
        : defaultTheme.colors.error,
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 20
      aspectRatio: 3 / 2,
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
          <TouchableOpacity onPress={() => handleVoice()}>
            <FastImage
              style={styles.image}
              resizeMode='stretch'
              source={getImage('btnsound')}
            />
          </TouchableOpacity>
          <Text style={styles.textTitle}>{randomAnswer?.tittle}</Text>
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
    paddingTop: height / 16,
  },
  bgImage: {
    backgroundColor: defaultTheme.colors.backgroundAnswer,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20
    aspectRatio: 3 / 2,
    width: width / 2.2,
    margin: 6,
    borderRadius: 10,
    // paddingLeft: 20,
  },
  imageAnswer: {
    aspectRatio: 1 / 1,
    width: width / 3.5,
  },
  Examcontainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flexImage: {
    paddingTop: height / 5,
    flex: 1,
    // justifyContent: 'center'
    // backgroundColor: '#000000',
  },
  image: {
    // flex: 1,
    aspectRatio: 1 / 1,
    width: width / 4.5,
  },
  textTitle: {
    fontSize: 20,
    paddingLeft: 8,
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

export default ListenAndGuess;
