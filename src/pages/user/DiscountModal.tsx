import { Modal, Form, Row, Col, Input, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import request from '@/request'
// 格式化满减数据
function formatDiscount(values: Record<any, any>) {
    const key2Value: Record<any, any> = {}
    Object.entries(values).forEach(([key, value]) => {
        const [type, flag] = key.toString().split('_')
        if (key2Value[flag]) {
            key2Value[flag][type] = value
        } else {
            key2Value[flag] = {
                [type]: value
            }
        }
    })
    return Object.values(key2Value)
}
export function DiscountModal({ visible, setVisible, initDiscount }: { visible: boolean, setVisible: any, initDiscount: any[] }) {
    const [discountList, setList] = useState<Record<string, any>[]>([])
    const [form] = Form.useForm()

    useEffect(() => {
        if (Array.isArray(initDiscount) && initDiscount.length > 0) {
            const formValue: Record<string, any> = {}
            setList(initDiscount.map(item => {
                const id = uuidv4()
                formValue[`full_${id}`] = item.full
                formValue[`minus_${id}`] = item.minus
                return {
                    full: `full_${id}`,
                    minus: `minus_${id}`,
                }
            }))
            form.setFieldsValue(formValue)
        } else {
            setList([])
        }
    }, [visible])
    return (
        <Modal title='添加满减' visible={visible} okText='确定' cancelText='取消' onCancel={() => setVisible(false)} onOk={() => {
            form.validateFields().then((values) => {
                const resultDiscount = formatDiscount(values)
                request.post('/discount', resultDiscount).then(() => {
                    setVisible(false)
                })
            })

        }}>
            <Form form={form}>
                {discountList.map(item => {
                    return (
                        <Row key={item.full}>
                            <Col span={8}>
                                <Form.Item name={item.full} rules={[{
                                    required: true,
                                    message: '请输入',
                                }]}>
                                    <Input placeholder='请输入' />
                                </Form.Item>
                            </Col>
                            <Col span={1} offset={1} className='txc'>
                                -
                            </Col>
                            <Col span={8} offset={1}>
                                <Form.Item name={item.minus} rules={[{
                                    required: true,
                                    message: '请输入'
                                }]}>
                                    <Input placeholder='请输入' />
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                })}

            </Form>
            <div className=' txc'>
                <Button onClick={() => {
                    const id = uuidv4()
                    setList([...discountList, {
                        full: `full_${id},`,
                        minus: `minus_${id},`,
                    }])
                }}>添加</Button>
            </div>
        </Modal>
    )
}