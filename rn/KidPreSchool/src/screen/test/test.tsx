import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import axios from 'axios';

export const Test = () => {
  axios.get('http://localhost:1337/api/abc-songs', {}).then((response) => {
    console.log(response);
  });

  // fetch('http://localhost:1337/api/abc-songs')
  //   .then((response) => console.log(response))
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return (
    <View>
      <Text>test</Text>
    </View>
  );
};
