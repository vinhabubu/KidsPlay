import React, { useMemo, useState } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Modal } from 'react-native-paper';
import { useSelector } from 'react-redux';

import axios from 'axios';
import useModalManager from '~/hook/useModalManager';
import { useOrientation } from '~/hook/useOrientation';
import { selectUser } from '~/redux/slice/selectors';

const ExampleModalContent = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}): JSX.Element => {
  const [username, setUserName] = useState('');
  const { isPortrait, ORIENTATION_WIDTH, ORIENTATION_HEIGH } = useOrientation();
  const [showAlert, setShowAlert] = useState(false);
  const { getParams } = useModalManager();
  const user = getParams('ExampleModal')?.user;
  const dataUserAdmin = useSelector(selectUser);

  // const theme = useAppTheme();
  // console.log(dataUserAdmin?.accessToken);
  const dataToSend = { isActive: !user.isActive };
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
      width: isPortrait ? ORIENTATION_WIDTH / 1.2 : ORIENTATION_HEIGH / 1.2,
      backgroundColor: '#D3D3D3',
      paddingVertical: 16,
      borderRadius: 12,
    }),
    [ORIENTATION_WIDTH],
  );

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      extraScrollHeight={Platform.select({
        android: 30,
        ios: isPortrait ? 60 : 40,
      })}
      enableOnAndroid={true}
      keyboardShouldPersistTaps='handled'
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.keyboardAwareContent}>
      <View style={modalContainer}>
        <View style={styles.viewInfo}>
          <Text style={styles.textTitle}>
            {user?.isActive
              ? 'Do you want to block this account?'
              : 'Do you want to active this account?'}
          </Text>
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={changeActive}
            style={user?.isActive ? styles.delete : styles.cancel}>
            <Text style={styles.textButton}>
              {user?.isActive ? 'Block' : 'Active'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCloseModal}
            style={user?.isActive ? styles.cancel : styles.delete}>
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const ExampleModal = (): JSX.Element | null => {
  const { isOpen, closeModal } = useModalManager('ExampleModal');
  const visible = isOpen('ExampleModal');

  const onClose = (): void => {
    closeModal('ExampleModal');
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modal}>
      {visible ? <ExampleModalContent onCloseModal={onClose} /> : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  viewInfo: {
    height: 60,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAwareContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textButton: {
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
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
  containerButton: { flexDirection: 'row', justifyContent: 'space-around' },
});

export default ExampleModal;
