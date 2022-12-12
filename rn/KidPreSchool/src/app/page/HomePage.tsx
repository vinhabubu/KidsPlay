import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import { useGithubRepoFormSlice } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoading, selectRepos, selectUsername } from './slice/selectors';


const HomePage = () => {
    const { actions } = useGithubRepoFormSlice();

    const username = useSelector(selectUsername);
    const repos = useSelector(selectRepos);
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.changeUsername('Home'))
        console.log('1', isLoading);
    }, [])
    return (
        <View>
            <Text>Home Page</Text>
        </View>
    )
}

export default HomePage