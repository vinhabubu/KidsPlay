import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

import Header from '~/components/header/Header';
import { HomeData } from '~/data/HomeData';
import { HomePageNavProps } from '~/navigators/RootNavigator';
import { useGithubRepoFormSlice } from '~/redux/slice';
import { selectUsername } from '~/redux/slice/selectors';

const Home = () => {
  const navigation = useNavigation<HomePageNavProps>();

  // const [id, setId] = useState(0)
  const handleClick = (item: HomeInFo) => {
    if (item.id !== '1') {
      navigation.navigate('ShareMenuPage');
    }
  };
  const renderItem = ({ item }: { item: HomeInFo }) => {
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <View>
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
    marginTop: 8,
  },
  image: {
    width: Dimensions.get('window').width - 10,
    height: 200,
    margin: 4,
    borderRadius: 12,
  },
});

export default Home;
