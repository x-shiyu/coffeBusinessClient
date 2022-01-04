import { Modal, Form, Input, Upload, message } from 'antd'
import React, { useEffect, useState, useMemo } from 'react'
import request from '@/request'
import { CoffeInfo } from './service'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { getBase64 } from '@/utils'

export function AddNewGoodsModal({
  visible,
  setVisible,
  addGoods,
  item,
  cateId,
}: {
  visible: boolean
  setVisible: any
  addGoods: any
  cateId: string
  item?: CoffeInfo
}) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [cImageUrl, setCImgUrl] = useState<string>('')

  const imageUrl = useMemo(() => cImageUrl || item?.thumb, [cImageUrl, item])
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  )
  useEffect(() => {
    if (item && visible) {
      form.setFieldsValue({
        ...item,
      })
      setCImgUrl(item.thumb_url || '')
    } else {
      form.resetFields()
    }
  }, [item, visible])

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url: string) => {
        setCImgUrl(url)
        form.setFieldsValue({
          thumb: {
            file_id: info.file.response.fileId,
          },
        })
        setLoading(false)
      })
    }
  }

  return (
    <Modal
      title="添加商品"
      visible={visible}
      okText="确定"
      onCancel={() => setVisible(false)}
      cancelText="取消"
      onOk={() => {
        form.validateFields().then((values) => {
          if (item) {
            request
              .put('/goods/list/', {
                ...item,
                ...values,
                thumb: values.thumb.file_id,
                cate_id: cateId,
              })
              .then(() => {
                message.success('更新成功')
                setVisible(false)
                addGoods({...item,...values}, true)
              })
          } else {
            request
              .post('/goods/list/', {
                ...values,
                cate_id: cateId,
                thumb: values.thumb.file_id,
              })
              .then((response: any) => {
                message.success('新增成功')
                setVisible(false)
                addGoods({
                  ...values,
                  id: response.id,
                  thumb_url:`/api/file/fetch?id=${response.id}`,
                })
              })
          }
        })
      }}
    >
      <Form form={form}>
        <Form.Item
          label="名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入名称',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="价格"
          name="price"
          rules={[
            {
              required: true,
              message: '请输入价格',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="产品图片"
          name="thumb"
          rules={[
            {
              required: true,
              message: '请上传产品图片',
            },
          ]}
        >
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/api/file/upload/"
            multiple={false}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label="折扣"
          name="discount"
        >
          <Input placeholder="请输入" type="number" />
        </Form.Item>
        <Form.Item
          label="商品描述"
          name="description"
          rules={[
            {
              required: true,
              message: '请输入折扣',
            },
          ]}
        >
          <Input.TextArea placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
