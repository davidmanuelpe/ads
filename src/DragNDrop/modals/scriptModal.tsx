import React, { useState } from 'react';
import {
  Modal,
  Tabs,
} from 'antd';

const { TabPane } = Tabs;

interface Iscript {
  script: string,
  type: string
}


interface params {
  visible: boolean,
  setVisible: any,
  data: Iscript[],
}

const ShowScriptModal = ({ visible, setVisible, data }: params) => {
  const [computerIndex, setComputerIndex] = useState(0)
  const handleCancel = () => setVisible(false)

  function download() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data[computerIndex].script.replaceAll('<br />', '\n')));
    console.log(data[computerIndex])
    if (data[computerIndex].type === 'bash') {
      element.setAttribute('download', 'script.sh');
    }
    else {
      element.setAttribute('download', 'script.py');
    }

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
            {data.map((payload, index) =>
              <TabPane tab={`computer ${index + 1}`} key={index}>
                <p>
                  <div dangerouslySetInnerHTML={{ __html: payload.script }} />
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
