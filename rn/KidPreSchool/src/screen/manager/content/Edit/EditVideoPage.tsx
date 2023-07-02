import * as React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import * as ImagePicker from 'react-native-image-picker';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { DataMenu } from '~/data/DataMenu';
import { selectIdMenu } from '~/redux/slice/selectors';
import { defaultTheme } from '~/theme/theme';

import HeaderManager from '../../components/HeaderManager';

/* toggle includeExtra */
const includeExtra = true;
const { width } = Dimensions.get('window');

export default function EditVideoPage() {
  const [response, setResponse] = React.useState<any>(null);
  const option = {
    saveToPhotos: true,
    mediaType: 'photo',
    includeBase64: true,
    includeExtra,
  };
  const idMenu = useSelector(selectIdMenu);
  // console.log('1', idMenu);
  const dataLearning = DataMenu[idMenu];
  // console.log(dataLearning);
  const [IsImage, setIsImage] = React.useState(false);

  const onButtonPress = React.useCallback(() => {
    // if (type === 'capture') {
    //   launchCamera(options, setResponse);
    // } else {
    // console.log(options);
    launchImageLibrary(option, setResponse);
    // }
  }, []);
  React.useEffect(() => {
    // console.log(response?.assets[0].uri);
    if (response?.assets[0].uri !== undefined) {
      setIsImage(true);
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <DemoTitle>🌄 React Native Image Picker</DemoTitle> */}
      <HeaderManager />
      {/* <DemoResponse>{response}</DemoResponse> */}
      <TouchableOpacity
        onPress={() => onButtonPress()}
        style={styles.buttonContainer}>
        {IsImage ? (
          response?.assets.map(({ uri }: { uri: string }) => (
            <View key={uri} style={styles.imageContainer}>
              <Image
                resizeMode='cover'
                resizeMethod='scale'
                style={styles.image}
                source={{ uri: uri }}
              />
            </View>
          ))
        ) : (
          <View style={styles.imageContainer}>
            <FastImage style={styles.image} source={dataLearning.image} />
          </View>
        )}
      </TouchableOpacity>
      <View>
        {/* <Text style={styles.textTitle}>Title</Text>
        <TextInput
          defaultValue={dataLearning?.name}
          // placeholderTextColor='#757575'
          //   underlineColorAndroid='transparent'
          underlineColor='transparent'
          activeUnderlineColor='transparent'
          style={styles.input}
        /> */}
        <View style={styles.name}>
          <Text style={styles.text}>Title</Text>
          <TextInput style={styles.input} defaultValue={dataLearning?.name} />
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.edit}>
          <Text style={styles.textEdit}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout}>
          <Text style={styles.textEdit}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // marginVertical: 8,
    // backgroundColor: 'red',
    borderColor: '#A9A9A9',
    borderWidth: 2,
    margin: 16,
    borderRadius: 12,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  input: {
    height: 40,
    width: width / 1.5,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    marginRight: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  button: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    padding: 4,
    backgroundColor: '#42b883',
    borderRadius: 8,
    marginRight: 12,
  },
  logout: {
    padding: 4,
    backgroundColor: 'red',
    borderRadius: 8,
    marginLeft: 12,
  },
  textEdit: {
    margin: 4,
    marginLeft: 10,
    marginRight: 10,
    color: defaultTheme.colors.background,
    fontSize: 14,
    fontWeight: '900',
    // borderRadius: 12,
  },
});
