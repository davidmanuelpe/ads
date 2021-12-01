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
    <Form.Item label="Memory_buffers">
      <Switch checked={fields.memory_buffers} />
    </Form.Item>
    <Form.Item label="Memory_cache">
      <Switch checked={fields.memory_cache} />
    </Form.Item>
    <Form.Item label="Memory_free">
      <Switch checked={fields.memory_free} />
    </Form.Item>
    <Form.Item label="Memory_shared">
      <Switch checked={fields.memory_shared} />
    </Form.Item>
    <Form.Item label="Memory_total">
      <Switch checked={fields.memory_total} />
    </Form.Item>
    <Form.Item label="Memory_used">
      <Switch checked={fields.memory_used} />
    </Form.Item>
    <Form.Item label="Rsa">
      <Switch checked={fields.rsa} />
    </Form.Item>
    <Form.Item label="Swap_free">
      <Switch checked={fields.swap_free} />
    </Form.Item>
    <Form.Item label="Swap_total">
      <Switch checked={fields.swap_total} />
    </Form.Item>
    <Form.Item label="Swap_used">
      <Switch checked={fields.swap_used} />
    </Form.Item>
    <Form.Item label="Zombie_process_total">
      <Switch checked={fields.zombie_process_total} />
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
    <Form.Item label="Guest">
      <Switch checked={fields.guest} />
    </Form.Item>
    <Form.Item label="Iowait">
      <Switch checked={fields.iowait} />
    </Form.Item>
    <Form.Item label="Irq">
      <Switch checked={fields.irq} />
    </Form.Item>
    <Form.Item label="Nice">
      <Switch checked={fields.nice} />
    </Form.Item>
    <Form.Item label="Soft">
      <Switch checked={fields.soft} />
    </Form.Item>
    <Form.Item label="Steal">
      <Switch checked={fields.steal} />
    </Form.Item>
    <Form.Item label="Sys">
      <Switch checked={fields.sys} />
    </Form.Item>
    <Form.Item label="User">
      <Switch checked={fields.user} />
    </Form.Item>
  </>
)

const NetworkFields = ({ fields }: any) => (
  <>
    <Form.Item label="Name">
      <Input value={fields.name} />
    </Form.Item>
    <Form.Item label="download_kb">
      <Switch checked={fields.download_kb} />
    </Form.Item>
    <Form.Item label="download_packet">
      <Switch checked={fields.download_packet} />
    </Form.Item>
    <Form.Item label="upload_kb">
      <Switch checked={fields.upload_kb} />
    </Form.Item>
    <Form.Item label="upload_packet">
      <Switch checked={fields.upload_packet} />
    </Form.Item>
  </>
)

const ProcessesFields = ({ fields }: any) => (
  <>
    <Form.Item label="Name">
      <Input value={fields.name} />
    </Form.Item>
    <Form.Item label="Cpu">
      <Switch checked={fields.cpu} />
    </Form.Item>
    <Form.Item label="Mem">
      <Switch checked={fields.mem} />
    </Form.Item>
    <Form.Item label="Virtmem">
      <Switch checked={fields.virtmem} />
    </Form.Item>
    <Form.Item label="Resmem">
      <Switch checked={fields.resmem} />
    </Form.Item>
  </>
)

const DiskFields = ({ fields }: any) => (
  <>
    <Form.Item label="Name">
      <Input value={fields.name} />
    </Form.Item>
    <Form.Item label="Comment">
      <Input value={fields.comment} />
    </Form.Item>
    <Form.Item label="blocks">
      <Switch checked={fields.blocks} />
    </Form.Item>
    <Form.Item label="free_kb">
      <Switch checked={fields.free_kb} />
    </Form.Item>
    <Form.Item label="free_percent">
      <Switch checked={fields.free_percent} />
    </Form.Item>
    <Form.Item label="total">
      <Switch checked={fields.total} />
    </Form.Item>
    <Form.Item label="used_kb">
      <Switch checked={fields.used_kb} />
    </Form.Item>
    <Form.Item label="used_percent">
      <Switch checked={fields.used_percent} />
    </Form.Item>
  </>
)

const MemoryFields = ({ fields }: any) => (
  <>
    <Form.Item label="Name">
      <Input value={fields.name} />
    </Form.Item>
    <Form.Item label="Total">
      <Switch checked={fields.total} />
    </Form.Item>
    <Form.Item label="Used">
      <Switch checked={fields.used} />
    </Form.Item>
    <Form.Item label="Free">
      <Switch checked={fields.free} />
    </Form.Item>
    <Form.Item label="Shared">
      <Switch checked={fields.shared} />
    </Form.Item>
    <Form.Item label="Buff_and_cache">
      <Switch checked={fields.buff_and_cache} />
    </Form.Item>
    <Form.Item label="Available">
      <Switch checked={fields.available} />
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
  if (type === 'network') {
    return (<NetworkFields fields={fields} />)
  }
  if (type === 'processes') {
    return (<ProcessesFields fields={fields} />)
  }
  if (type === 'disk') {
    return (<DiskFields fields={fields} />)
  }
  if (type === 'memory') {
    return (<MemoryFields fields={fields} />)
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
