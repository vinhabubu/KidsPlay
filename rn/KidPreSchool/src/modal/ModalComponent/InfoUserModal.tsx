import { Picker } from '@react-native-picker/picker';
import React, { useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Modal } from 'react-native-paper';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { useSelector } from 'react-redux';

import axios from 'axios';
import useModalManager from '~/hook/useModalManager';
import { useOrientation } from '~/hook/useOrientation';
import { selectUser } from '~/redux/slice/selectors';
import { defaultTheme } from '~/theme/theme';

const { width } = Dimensions.get('window');
const UserInfoModalContent = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}): JSX.Element => {
  const [username, setUserName] = useState('');
  const { isPortrait, ORIENTATION_WIDTH, ORIENTATION_HEIGH } = useOrientation();
  const [showAlert, setShowAlert] = useState(false);
  const { getParams } = useModalManager();
  const user = getParams('InfoUserModal')?.user;

  const dataUserAdmin = useSelector(selectUser);
  const [selectedLanguage, setSelectedLanguage] = useState();

  // const theme = useAppTheme();

  // const dataToSend = { isActive: !user.isActive };
  const config = {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${dataUserAdmin?.accessToken}`,
    },
  };

  const changeActive = () => {
    axios
      .put(`http://localhost:8800/api/users/${user._id}`, dataToSend, config)
      .then(function (response) {
        console.log(response.data);
        // console.log(response);
      })
      .catch(console.log);
    onCloseModal();
  };

  const modalContainer = useMemo<StyleProp<ViewStyle>>(
    () => ({
      width: isPortrait ? ORIENTATION_WIDTH / 1.1 : ORIENTATION_HEIGH / 1.2,
      height: ORIENTATION_HEIGH / 1.8,
      backgroundColor: '#FFEFD5',
      borderRadius: 12,
      // alignItems: 'center',
    }),
    [ORIENTATION_WIDTH],
  );

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <View style={modalContainer}>
      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <View style={styles.viewImage}>
          <FastImage
            style={styles.image}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/2048px-Faenza-avatar-default-symbolic.svg.png',
            }}
          />
        </View>
      </View>
      <View style={styles.detail}>
        <Text style={styles.textTitle}>Username</Text>
        <Text style={styles.text}> {user?.username}</Text>
      </View>
      <View style={styles.detail}>
        <Text style={styles.textTitle}>Email</Text>
        <Text style={styles.text}> {user?.email}</Text>
      </View>
      <View style={styles.detail}>
        <Text style={styles.textTitle}>Role</Text>
        {user?.isAdmin && <Text style={styles.text}> Admin</Text>}
        {user?.isManager && <Text style={styles.text}> Manager</Text>}
        {!user?.isManager && !user?.isAdmin && (
          <Text style={styles.text}> User</Text>
        )}
      </View>
      <View style={styles.detail}>
        <Text style={styles.textTitle}>Status</Text>
        {user?.isActive ? (
          <Text style={styles.text}> Active</Text>
        ) : (
          <Text style={styles.text}> Block</Text>
        )}
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.edit}>
          <Text style={styles.textEdit}>Update</Text>
        </TouchableOpacity>
      </View>
      <Picker
        ref={pickerRef}
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedLanguage(itemValue);
          console.log(itemValue);
        }}>
        <TouchableOpacity onPress={close}>
          <Picker.Item label='Java' value='java' />
        </TouchableOpacity>
        <TouchableOpacity onPress={close}>
          <Picker.Item label='JavaScript' value='js' />
        </TouchableOpacity>
      </Picker>
    </View>
  );
};

const UserInfoModal = (): JSX.Element | null => {
  const { isOpen, closeModal } = useModalManager('InfoUserModal');
  const visible = isOpen('InfoUserModal');

  const onClose = (): void => {
    closeModal('InfoUserModal');
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modal}>
      {visible ? <UserInfoModalContent onCloseModal={onClose} /> : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    // textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    // textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#424242',
    marginLeft: 8,
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 4,
    backgroundColor: '#B0E0E6',
    width: 80,
    height: 80,
    borderRadius: 48,
  },
  edit: {
    backgroundColor: '#42b883',
    borderRadius: 8,
    padding: 4,
    marginTop: 12,
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
  cancel: {
    backgroundColor: '#42b883',
    borderRadius: 12,
    // marginLeft: 12,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
  },
  delete: {
    backgroundColor: '#FF0000',
    borderRadius: 12,
    // marginLeft: 12,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16,
  },
  image: {
    // backgroundColor: '#000000',
    width: width * 0.14,
    // height: width * 0.14,

    // margin: 50,
    aspectRatio: 1 / 1,
    margin: width * 0.02,
    // flex: 1,
    resizeMode: 'contain',
  },
  detail: {
    // flexDirection: 'row',
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    marginRight: 16,
    marginLeft: 16,
    padding: 10,
    borderRadius: 12,
  },
});

export default UserInfoModal;
