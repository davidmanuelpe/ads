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
  return (
    <div>
      {data.length > 0 ? (
        <Modal
          visible={visible}
          onOk={handleCancel}
          title="Script"
          onCancel={handleCancel}
          width="70%"
        >
          {data.map(script =>
            <p> {script}</p>
          )}
        </Modal>
      ) : <></>
      }
    </div>
  );
};

export default ShowScriptModal;
