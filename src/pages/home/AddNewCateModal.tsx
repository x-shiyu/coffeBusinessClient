import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from 'antd'
import request from '@/request'
export function AddNewCateModal({ visible, setVisible, addCate }: { visible: boolean, setVisible: any, addCate: any }) {


    const [form] = Form.useForm()
    const onAddNewCate = () => {
        form.validateFields().then((values) => {
            request.post('/goods/cate', values).then((response) => {
                addCate(response.data)
                setVisible(false)
            })
        })
    }

    useEffect(() => {
        if (!visible) {
            form.resetFields()
        }
    }, [visible])
    return (
        <Modal title='添加咖啡分类' visible={visible} okText='添加' cancelText='取消' onOk={onAddNewCate} onCancel={() => setVisible(false)}>
            <Form form={form}>
                <Form.Item label='类别名称' name='cate' rules={[{
                    required: true,
                    message: '请输入类别名称'
                }]}>
                    <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item label='类别描述' name='desc'>
                    <Input.TextArea placeholder='请输入' />
                </Form.Item>
            </Form>
        </Modal>
    )
}