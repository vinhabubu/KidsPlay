import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';

import Header from '~/components/header/Header';
import { HomeData } from '~/data/HomeData';
import { HomePageNavProps } from '~/navigators/RootNavigator';
import { useGithubRepoFormSlice } from '~/redux/slice';

const Home = () => {
  const navigation = useNavigation<HomePageNavProps>();
  const dispatch = useDispatch();
  const { actions } = useGithubRepoFormSlice();

  // const [id, setId] = useState(0)
  const handleClick = (item: HomeInFo) => {
    if (item.id === '1') {
      console.log('video learning');
    } else {
      dispatch(actions.changeIdHome(item.id!));
      navigation.navigate('ShareMenuPage');
    }
  };
  const renderItem = ({ item }: { item: HomeInFo }) => {
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <View style={styles.imageContainer}>
          <FastImage style={styles.image} source={item.image} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SafeAreaView style={styles.flatlist}>
        <FlatList
          data={HomeData}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  flatlist: {
    flex: 1,
    // marginTop: 6,
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '95%',
    aspectRatio: 10 / 5,
    // margin: 10,
    borderRadius: 12,
    marginTop: 16,
    // paddingTop: -2,
  },
});

export default Home;
