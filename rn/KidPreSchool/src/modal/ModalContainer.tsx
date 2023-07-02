import React from 'react';

import ExampleModal from './ModalComponent/ExampleModal';
import UserInfoModal from './ModalComponent/InfoUserModal';

const ModalContainer = (): JSX.Element => {
  return (
    <>
      <ExampleModal />
      <UserInfoModal />
      {/* TODO: this is sample modal, add more modal between  */}
    </>
  );
};

export default ModalContainer;
