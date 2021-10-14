import React from 'react'
import { Form, Input, FormInstance } from 'antd';
export function AuthBox({ form, isLogin }: { form: FormInstance<any>; isLogin: boolean }) {

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };
    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
    };
    return (
        <Form form={form} name="from-register">
            <Form.Item
                {...formItemLayout}
                name="email"
                label="邮箱"
                rules={[
                    {
                        required: true,
                        message: '请输入邮箱',
                    },
                ]}
            >
                <Input placeholder="请输入" />
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                name="pwd"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },

                ]}
            >
                <Input.Password placeholder="请输入" />
            </Form.Item>
            {!isLogin ? (<Form.Item
                {...formItemLayout}
                name="pwd_confirm"
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
                            return Promise.reject(new Error('密码不相等'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="请输入" />
            </Form.Item>) : undefined}
        </Form>
    )
}