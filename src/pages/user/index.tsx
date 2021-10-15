import React, { useState, useMemo } from "react";
import { Drawer, Form, Button, Input, message, Switch } from 'antd'
import { authInfo } from '../../recoil'
import { useRecoilState } from 'recoil'
import { updateUserInfo } from "./services";
import request from '@/request'
import { DiscountModal } from "./DiscountModal";
function PasswordForm({ setVisible }: { setVisible: any }) {
    const [form] = Form.useForm()
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };
    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
    };

    const onUpdate = () => {
        form.validateFields().then(async (values) => {
            updateUserInfo(values).then(() => {
                message.success('修改成功')
                setVisible(false)
            })
        })
    }
    return (
        <Form form={form} name="dynamic_rule">
            <Form.Item
                {...formItemLayout}
                name="oldPwd"
                label="旧密码"
                rules={[
                    {
                        required: true,
                        message: '请输入原密码',
                    },
                ]}
            >
                <Input.Password placeholder="请输入原密码" />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                name="pwd"
                label="新密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
            >
                <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                name="pwdConfirm"
                label="重复密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('pwd') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('两次密码不相同!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item {...formTailLayout}>
                <Button type="primary" onClick={onUpdate}>
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}
export default function User() {
    const [info, setInfo] = useRecoilState(authInfo)
    const [visible, setVisible] = useState<boolean>(false)
    const [discountShow, setDiscountShow] = useState<boolean>(false)
    const handleAutoAccept = (value: boolean) => {
        request.put('/config/accept', {
            id: info.id,
            value
        }).then(() => {
            setInfo({
                ...info,
                autoAccept: value
            })
        })
    }
    return (
        <div className='bgc444 cddd pt20' style={{ width: "100%" }} >
            <h1 className='cddd txc'>账户信息</h1>
            <ul>
                <li className='txc pt10'>邮箱：{info.email}</li>
                <li className='txc pt10'>
                    <span>自动接单：</span>
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={info.autoAccept} onChange={handleAutoAccept} />
                </li>
                <li className='txc pt20 p10'>
                    <Button type='primary' onClick={() => {
                        setDiscountShow(true)
                    }}>配置满减</Button>
                </li>
                <li className='txc pt10' onClick={() => {
                    setVisible(true)
                }}>
                    <Button type='primary'>修改密码</Button>
                </li>
            </ul>
            <Drawer
                title={null}
                placement="right"
                closable={false}
                width={600}
                onClose={() => {
                    setVisible(false)
                }}
                visible={visible}
            >
                <PasswordForm setVisible={setVisible} />
            </Drawer>
            <DiscountModal visible={discountShow} setVisible={setDiscountShow} />
        </div>
    )
}