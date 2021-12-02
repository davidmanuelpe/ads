import React, { FC } from 'react';
import {
  Modal,
  Button,
} from 'antd';

interface params {
  visible: boolean,
  setVisible: any,
  data: string[],
}

const ShowScriptModal = ({ visible, setVisible, data }: params) => {
  const handleCancel = () => setVisible(false)
  console.log(data)
  return (
    <div>
      <Modal
        visible={visible}
        title="Script"
        onCancel={handleCancel}
        width="70%"
      >
        {data.map(script =>
          <p> {script}</p>
        )}
      </Modal>
    </div>
  );
};

export default ShowScriptModal;
