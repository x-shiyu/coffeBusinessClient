import { Modal, Form, Row, Col, Input, Button } from 'antd'
import React, { useState, useMemo } from 'react'


export function DiscountModal({ visible, setVisible }: { visible: boolean, setVisible: any }) {
    const [discountList, setList] = useState<Record<string, any>[]>([])

    // const discountList = useMemo(() => {
    //     // { full?: number, minus?: number }
    //     const name2arr: Record<any, any> = {}
    //     Object.keys(discountMap).forEach((key) => {
    //         const [name, id] = key.split('_')
    //         if (name2arr[id]) {
    //             name2arr[id][name] = key
    //         } else {
    //             name2arr[id] = {
    //                 [name]: key
    //             }
    //         }
    //     })
    //     return Object.values(name2arr)
    // }, [discountMap])
    const [form] = Form.useForm()
    return (
        <Modal title='添加满减' visible={visible} okText='确定' cancelText='取消' onCancel={() => setVisible(false)} onOk={() => {

            console.log(form.getFieldsValue());

        }}>
            <Form form={form}>
                {discountList.map(item => {
                    return (
                        <Row>
                            <Col span={5}>
                                <Form.Item name={item.full}>
                                    <Input placeholder='请输入' />
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                                -
                            </Col>
                            <Col span={5}>
                                <Form.Item name={item.minus}>
                                    <Input placeholder='请输入' />
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                })}

            </Form>
            <div className='pt20 txc'>
                <Button onClick={() => {
                    const id = Date.now()
                    setList([...discountList, {
                        full: `full_${id},`,
                        minus: `minus_${id},`,
                    }])
                }}>添加</Button>
            </div>
        </Modal>
    )
}