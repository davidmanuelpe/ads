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

  function download() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data.join(',').replaceAll('<br />', '\n')));
    element.setAttribute('download', 'script.sh');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

  return (
    <div>
      {data.length > 0 ? (
        <Modal
          visible={visible}
          okText={'Baixar Script'}
          onOk={download}
          title="Script"
          onCancel={handleCancel}
          width="70%"
        >
          {data.map(script =>
            <p>
              <div dangerouslySetInnerHTML={{ __html: script }} />
              </p>
          )}
        </Modal>
      ) : <></>
      }
    </div>
  );
};

export default ShowScriptModal;
