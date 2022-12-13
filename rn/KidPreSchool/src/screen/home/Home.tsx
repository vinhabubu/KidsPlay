import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

import { HomeData } from '~/data/HomeData';
import { HomePageNavProps } from '~/navigators/RootNavigator';
import { useGithubRepoFormSlice } from '~/redux/slice';
import { selectUsername } from '~/redux/slice/selectors';

const Home = () => {
  const navigation = useNavigation<HomePageNavProps>();

  // const [id, setId] = useState(0)
  const handleClick = () => {
    // console.log(id)
  };
  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity onPress={() => handleClick()}>
        <View>
          <FastImage style={styles.image} source={item.image} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Headbar /> */}
      <SafeAreaView style={styles.flatlist}>
        <FlatList
          data={HomeData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    marginTop: 8,
  },
  image: {
    width: 380,
    height: 200,
    margin: 6,
    borderRadius: 12,
  },
});

export default Home;
