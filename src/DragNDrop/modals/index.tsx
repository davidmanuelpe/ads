import React, { FC } from 'react';
import {
  Modal,
  Button,
  Form,
  Switch,
  Input,
} from 'antd';

interface params {
  visible: boolean,
  setVisible: any,
  fields: any,
  type: string
}

interface IfieldType {
  fields: any,
  type: string,
}

const ComputerFields = ({ fields }: any) => (
  <>
    <Form.Item label="Name">
      <Input value={fields.name} />
    </Form.Item>
    <Form.Item label="Data">
      <Switch checked={fields.data} />
    </Form.Item>
    <Form.Item label="Hour">
      <Switch checked={fields.hour} />
    </Form.Item>
  </>
)

const CpuFields = ({ fields }: any) => (
  <>
    <Form.Item label="Name">
      <Input value={fields.name} />
    </Form.Item>
    <Form.Item label="Gnice">
      <Switch checked={fields.gnice} />
    </Form.Item>
    <Form.Item label="Idle">
      <Switch checked={fields.idle} />
    </Form.Item>
  </>
)

const FieldsType = ({ fields, type }: IfieldType) => {
  console.log(type)
  if (type === 'computer') {
    return (<ComputerFields fields={fields} />)
  }
  if (type === 'cpu') {
    return (<CpuFields fields={fields} />)
  }

  return (<ComputerFields />)
}


const FormModal = ({ visible, setVisible, fields, type }: params) => {
  const handleCancel = () => setVisible(false)

  const handleFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div>
      <Modal
        visible={visible}
        title="Title"
        onOk={() => console.log('mandou')}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" htmlType="submit" type="primary" form="modal-form">
            Submit
          </Button>,
        ]}
      >
        <Form id="modal-form" onFinish={handleFinish}>
          <FieldsType type={type} fields={fields} />
        </Form>
      </Modal>
    </div>
  );
};

export default FormModal;
