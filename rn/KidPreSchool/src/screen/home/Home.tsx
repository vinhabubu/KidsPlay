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
import { DataHome } from '~/data/DataHome';
import { HomePageNavProps } from '~/navigators/RootNavigator';
import { useKidsPreSchoolSlice } from '~/redux/slice';

const Home = () => {
  const navigation = useNavigation<HomePageNavProps>();
  const dispatch = useDispatch();
  const { actions } = useKidsPreSchoolSlice();

  // const [id, setId] = useState(0)
  const handleClick = (item: HomeInFo) => {
    if (item.id === '1') {
      navigation.navigate('VideoMenuPage');
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
    <View style={styles.container}>
      <Header />
      <SafeAreaView style={styles.flatlist}>
        <FlatList
          data={DataHome}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
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
