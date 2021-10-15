import { Modal, Form, Input, Upload } from "antd";
import React, { useEffect, useState, useMemo } from "react";
import request from '@/request'
import { CoffeInfo } from "./service";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { getBase64 } from "@/utils";


export function AddNewGoodsModal({ visible, setVisible, addGoods, item }: { visible: boolean, setVisible: any, addGoods: any, item?: CoffeInfo }) {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)
    const [cImageUrl, setCImgUrl] = useState<string>('');

    const imageUrl = useMemo(() => cImageUrl || item?.thumb, [cImageUrl, item])
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传</div>
        </div>
    );
    useEffect(() => {
        if (item && visible) {
            form.setFieldsValue({
                ...item,
                thumb: [item.thumb]
            })
        }
    }, [item, visible])


    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            const fileUrl = '/api/file?id=' + info.file.response
            form.setFieldsValue({
                thumb: fileUrl
            })
            setLoading(false)
            setCImgUrl(fileUrl)
        }
    };

    return (
        <Modal title="添加商品" visible={visible} okText='确定' onCancel={() => setVisible(false)} cancelText='取消' onOk={() => {
            form.validateFields().then((values) => {
                if (item) {
                    request.put('/goods', values).then(() => {
                        setVisible(false)
                        addGoods({
                            ...item,
                            ...values
                        })
                    })
                } else {
                    request.post('/goods', values).then(({ data }) => {
                        setVisible(false)
                        addGoods(data)
                    })
                }
            })
        }}>
            <Form form={form}>
                <Form.Item label='名称' name='name' rules={[{
                    required: true,
                    message: '请输入名称'
                }]}>
                    <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item label='价格' name='price' rules={[{
                    required: true,
                    message: '请输入价格'
                }]}>
                    <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item label='产品图片' name='thumb'
                    rules={[{
                        required: true,
                        message: '请上传产品图片'
                    }]}>
                    <Upload
                        name="thumb"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/api/file"
                        multiple={false}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item label='可用积分' name='canUsePoints' rules={[{
                    required: true,
                    message: '请输入可用积分'
                }]}>
                    <Input placeholder='请输入' type='number' />
                </Form.Item>
            </Form>
        </Modal>
    )
}