import * as React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { DataMenu } from '~/data/DataMenu';
import { selectIdMenu } from '~/redux/slice/selectors';

/* toggle includeExtra */
const includeExtra = true;

export default function EditContentPage() {
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
        <Text style={styles.textTitle}>Title</Text>
        <TextInput
          defaultValue={dataLearning?.name}
          // placeholderTextColor='#757575'
          //   underlineColorAndroid='transparent'
          underlineColor='transparent'
          activeUnderlineColor='transparent'
          style={styles.input}
        />
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
    borderColor: 'red',
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
  textTitle: {
    fontSize: 16,
    color: '#000000',
  },
  input: {
    backgroundColor: ' transparent',
    borderColor: 'red',
    borderWidth: 1,
    height: 36,
    // marginTop: 8,
  },
});
