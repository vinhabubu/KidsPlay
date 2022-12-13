import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useGithubRepoFormSlice } from '~/redux/slice';
import { selectUsername } from '~/redux/slice/selectors';

const Home = () => {
  const { actions } = useGithubRepoFormSlice();
  const username = useSelector(selectUsername);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(actions.changeUsername('Home'));
  //   console.log('1', username);
  // }, [username]);
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
