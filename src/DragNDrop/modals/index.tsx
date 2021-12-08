import React, { useEffect, useState } from 'react';
import {
    Modal,
    Button,
    Form,
    Switch,
    Input,
    TimePicker,
    Select,
    InputNumber,
} from 'antd';

import moment from 'moment'

interface params {
    visible: boolean,
    setVisible: any,
    fields: any,
    type: string,
    modalNodeId: string,
    updatePayload: any
}

interface IfieldType {
    fields: any,
    type: string,
    onChange: any
}

const ComputerFields = (fields: any) => {
    const [remote, setRemote] = useState(false)
    return (
        <>
            <Form.Item initialValue="bash" name="type" label="Script Type"
                rules={[{ required: true, message: 'Please input your phone number!' }]}

            >
                <Select>
                    <Select.Option value="bash">Bash</Select.Option>
                    <Select.Option value="python">Python</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="local" initialValue="local" label="Local" required>
                <Select onChange={(value) => {
                    if (value === 'local') {
                        setRemote(false)
                    } else {
                        setRemote(true)
                    }
                }}>
                    <Select.Option value="local">Local</Select.Option>
                    <Select.Option value="remote">Remote</Select.Option>
                </Select>
            </Form.Item>
            {
                remote && <>
                    <Form.Item
                        name="ip"
                        label="IP"
                        rules={[{ required: true, message: 'Please input IP!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="usarname" label="Username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input type="password" />
                    </Form.Item>
                </>
            }
            <Form.Item name="monitoring_time" label="Monitoring time">
                <InputNumber />
            </Form.Item>
            <Form.Item name="monitoring_frequency" label="Monitoring frequency">
                <InputNumber />
            </Form.Item>
            <Form.Item name="name" label="Name">
                <Input />
            </Form.Item>
            <Form.Item name="date" valuePropName="checked" label="Date">
                <Switch />
            </Form.Item>
            <Form.Item name="hour" valuePropName="checked" label="Hour">
                <Switch />
            </Form.Item>
            <Form.Item name="zombie_process_total" valuePropName="checked" label="Zombie process total">
                <Switch />
            </Form.Item>
        </>
    )
}

const CpuFields = ({ fields }: any) => (
    <>
        <Form.Item name="name" label="Name">
            <Input />
        </Form.Item>
        <Form.Item name="gnice" valuePropName="checked" label="Gnice">
            <Switch />
        </Form.Item>
        <Form.Item name="idle" valuePropName="checked" label="Idle">
            <Switch />
        </Form.Item>
        <Form.Item name="guest" valuePropName="checked" label="Guest">
            <Switch />
        </Form.Item>
        <Form.Item name="iowait" valuePropName="checked" label="Iowait">
            <Switch />
        </Form.Item>
        <Form.Item name="irq" valuePropName="checked" label="Irq">
            <Switch />
        </Form.Item>
        <Form.Item name="nice" valuePropName="checked" label="Nice">
            <Switch />
        </Form.Item>
        <Form.Item name="soft" valuePropName="checked" label="Soft">
            <Switch />
        </Form.Item>
        <Form.Item name="steal" valuePropName="checked" label="Steal">
            <Switch />
        </Form.Item>
        <Form.Item name="sys" valuePropName="checked" label="Sys">
            <Switch />
        </Form.Item>
        <Form.Item name="user" valuePropName="checked" label="User">
            <Switch />
        </Form.Item>
    </>
)

const NetworkFields = ({ fields }: any) => (
    <>
        <Form.Item name="name" label="Name">
            <Input />
        </Form.Item>
        <Form.Item name="download_kb" valuePropName="checked" label="Download kb">
            <Switch />
        </Form.Item>
        <Form.Item name="download_packet" valuePropName="checked" label="Download packet">
            <Switch />
        </Form.Item>
        <Form.Item name="upload_kb" valuePropName="checked" label="Upload kb">
            <Switch />
        </Form.Item>
        <Form.Item name="upload_packet" valuePropName="checked" label="Upload packet">
            <Switch />
        </Form.Item>
    </>
)

const DiskFields = ({ fields }: any) => (
    <>
        <Form.Item name="upload_kb" valuePropName="checked" label="Name">
            <Input />
        </Form.Item>
        <Form.Item name="comment" valuePropName="checked" label="Comment">
            <Input />
        </Form.Item>
        <Form.Item name="blocks" valuePropName="checked" label="Blocks">
            <Switch />
        </Form.Item>
        <Form.Item name="free_kb" valuePropName="checked" label="Free kb">
            <Switch />
        </Form.Item>
        <Form.Item name="free_percent" valuePropName="checked" label="Free percent">
            <Switch />
        </Form.Item>
        <Form.Item name="total" valuePropName="checked" label="Total">
            <Switch />
        </Form.Item>
        <Form.Item name="used_kb" valuePropName="checked" label="Used kb">
            <Switch />
        </Form.Item>
        <Form.Item name="used_percent" valuePropName="checked" label="Used percent">
            <Switch />
        </Form.Item>
    </>
)

const MemoryFields = ({ fields }: any) => (
    <>
        <Form.Item name="name" label="Name">
            <Input />
        </Form.Item>
        <Form.Item name="total" valuePropName="checked" label="Total">
            <Switch checked={fields.total} />
        </Form.Item>
        <Form.Item name="used" valuePropName="checked" label="Used">
            <Switch checked={fields.used} />
        </Form.Item>
        <Form.Item name="free" valuePropName="checked" label="Free">
            <Switch checked={fields.free} />
        </Form.Item>
        <Form.Item name="shared" valuePropName="checked" label="Shared">
            <Switch checked={fields.shared} />
        </Form.Item>
        <Form.Item name="buff_cache" valuePropName="checked" label="Buff and cache">
            <Switch checked={fields.buff_and_cache} />
        </Form.Item>
        <Form.Item name="available" valuePropName="checked" label="Available">
            <Switch checked={fields.available} />
        </Form.Item>
        <Form.Item name="swap_free" valuePropName="checked" label="Swap free">
            <Switch />
        </Form.Item>
        <Form.Item name="swap_total" valuePropName="checked" label="Swap total">
            <Switch />
        </Form.Item>
        <Form.Item name="swap_used" valuePropName="checked" label="Swap used">
            <Switch />
        </Form.Item>
    </>
)

const FieldsType = ({ fields, type, onChange }: IfieldType) => {
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
    if (type === 'disk') {
        return (<DiskFields fields={fields} />)
    }
    if (type === 'memory') {
        return (<MemoryFields fields={fields} />)
    }

    return (<ComputerFields />)
}


const FormModal = ({ visible, setVisible, fields, type, updatePayload, modalNodeId }: params) => {
    const [showTime, setShowTime] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        let values = fields
        if (fields.time) {
            const duration = moment.utc(fields.time * 1000).format('HH:mm:ss')
            values.time = moment(duration, 'HH:mm:ss')
        }
        console.log(values)
        form.setFieldsValue(values)
    }, [form, fields])

    const handleCancel = () => setVisible(false)


    function onTimeChange(time: any, timeString: string) {
        console.log(time, timeString);

    }

    const handleFinish = (values: any) => {
        let payload = values
        if (values.time) {
            payload.time = values.time.diff(moment().startOf('day'), 'seconds')
        }
        updatePayload(modalNodeId, payload)
        setVisible(false)
    }

    return (
        <div>
            <Modal
                bodyStyle={{ overflowY: 'scroll', height: 400 }}
                visible={visible}
                title="Component"
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
                <Form
                    form={form}
                    id="modal-form"
                    onFinish={handleFinish}
                    initialValues={fields}
                >
                    <FieldsType onChange={onTimeChange} type={type} fields={fields} />
                </Form>
            </Modal>
        </div>
    );
};

export default FormModal;
