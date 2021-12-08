import React, { useState } from 'react';
import {
  Modal,
  Tabs,
} from 'antd';

const { TabPane } = Tabs;

interface params {
  visible: boolean,
  setVisible: any,
  data: string[],
}

const ShowScriptModal = ({ visible, setVisible, data }: params) => {
  const [computerIndex, setComputerIndex] = useState(0)
  const handleCancel = () => setVisible(false)

  function download() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data[computerIndex].replaceAll('<br />', '\n')));
    element.setAttribute('download', 'script.sh');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function callback(key: string) {
    setComputerIndex(Number(key))
  }

  return (
    <div>
      {data.length > 0 ? (
        <Modal
          visible={visible}
          okText={'Baixar Script'}
          onOk={download}
          onCancel={handleCancel}
          width="70%"
        >
          <Tabs defaultActiveKey="1" onChange={callback}>
            {data.map((script, index) =>
              <TabPane tab={`computer ${index + 1}`} key={index}>
                <p>
                  <div dangerouslySetInnerHTML={{ __html: script }} />
                </p>
              </TabPane>
            )}
          </Tabs>
        </Modal>
      ) : <></>
      }
    </div >
  );
};

export default ShowScriptModal;
