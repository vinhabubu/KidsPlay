import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

import Header from '~/components/header/Header';
import { selectIdHome } from '~/redux/slice/selectors';

const ShareMenu = () => {
  const id = useSelector(selectIdHome);
  // console.log('1', id);
  return (
    <View>
      <Header />
      <Text>Share Menu</Text>
    </View>
  );
};

export default ShareMenu;
