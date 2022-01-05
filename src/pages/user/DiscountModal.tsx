import { Modal, Form, Row, Col, Input, Button } from 'antd'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import request from '@/request'
// 格式化满减数据
function formatDiscount(discountList:any[],values: Record<any,any>) {
  return discountList.map((item) => {
    const itemInner = {...item}
    Object.keys(item).forEach((key)=>{
      if(key==='full'){
        itemInner['full'] = values[item[key]]
      }
      if(key==='min'){
        itemInner['min'] = values[item[key]]
      }
    })
    return itemInner
  })
}
export function DiscountModal({
  visible,
  setVisible,
}: {
  visible: boolean
  setVisible: any
}) {
  const [discountList, setList] = useState<Record<string, any>[]>([])
  const [deleteList, setDelete] = useState<any[]>([])
  const [form] = Form.useForm()

  const handleDelete = (item: any) => {
    const matchIndex = discountList.findIndex((d) => d.$id === item.$id)
    const matchItem = discountList[matchIndex]
    if(matchItem.id){
      setDelete([...deleteList,matchItem.id])
    }
    discountList.splice(matchIndex, 1)
    setList([...discountList])
  }
  useEffect(() => {
    if (visible) {
      request
        .get('/user/shop/', {
          params: {
            type: 'promotion',
          },
        })
        .then((response: any) => {
          const formValue: Record<string, any> = {}
          setList(
            response.map((item: any) => {
              const id = uuidv4()
              formValue[`full_${id}`] = item.full
              formValue[`min_${id}`] = item.min
              return {
                ...item,
                full: `full_${id}`,
                min: `min_${id}`,
                ['$id'] :id,
              }
            })
          )
          form.setFieldsValue(formValue)
        })
    }
  }, [visible])
  return (
    <Modal
      title="添加满减"
      visible={visible}
      okText="确定"
      cancelText="取消"
      onCancel={() => setVisible(false)}
      onOk={() => {
        form.validateFields().then((values) => {
          const resultDiscount = formatDiscount(discountList,values)
          request
            .put('/user/shop/', {
              type: 'promotion',
              value: resultDiscount,
              deleteList:deleteList
            })
            .then(() => {
              setVisible(false)
            })
        })
      }}
    >
      <Form form={form}>
        {discountList.map((item) => {
          return (
            <Row key={item.full}>
              <Col span={8}>
                <Form.Item
                  name={item.full}
                  rules={[
                    {
                      required: true,
                      message: '请输入',
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={1} offset={1} className="txc">
                -
              </Col>
              <Col span={8} offset={1}>
                <Form.Item
                  name={item.min}
                  rules={[
                    {
                      required: true,
                      message: '请输入',
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
              <Col span={4} offset={1}>
                <Button type="primary" onClick={()=>handleDelete(item)}>
                  删除
                </Button>
              </Col>
            </Row>
          )
        })}
      </Form>
      <div className=" txc">
        <Button
          onClick={() => {
            const id = uuidv4()
            setList([
              ...discountList,
              {
                full: `full_${id},`,
                min: `min_${id},`,
                $id:id
              },
            ])
          }}
        >
          添加
        </Button>
      </div>
    </Modal>
  )
}
