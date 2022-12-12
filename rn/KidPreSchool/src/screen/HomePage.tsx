import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useGithubRepoFormSlice } from './slice';
import {
  selectError,
  selectLoading,
  selectRepos,
  selectUsername,
} from './slice/selectors';

const HomePage = () => {
  const { actions } = useGithubRepoFormSlice();
  const username = useSelector(selectUsername);
  const repos = useSelector(selectRepos);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.changeUsername('Homeeee123'));
    console.log('1', username);
  }, [username]);
  return (
    <View>
      <Text>Home page</Text>
    </View>
  );
};

export default HomePage;
