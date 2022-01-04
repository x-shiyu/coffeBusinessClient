import React, { useState } from 'react'
import { Form, Input, FormInstance, Upload, message } from 'antd'
import { getBase64 } from '@/utils'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
export function AuthBox({
  form,
  isLogin,
}: {
  form: FormInstance<any>
  isLogin: boolean
}) {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setUrl] = useState('')
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  }
  const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 },
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );
  const handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'error') {
      message.error(info.file.error.message)
      setLoading(false)
      return
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url:string) => {
        setLoading(false)
        setUrl(url)
      })
      form.setFields([{
        name:'shop_thumb',
        value:{
          id:info.file.response.fileId,
          imgUrl:info.file.response.filePath,
        }
      }])
     
    }
  }
  const beforeUpload = (file:any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('仅支持jpeg和png图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片应该小于2M')
    }
    return isJpgOrPng && isLt2M
  }
  return (
    <Form form={form} name={isLogin?'from-login':'form-register'}>
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
        name="password"
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
      {!isLogin ? (
        <>
          <Form.Item
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
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('密码不相等'))
                },
              }),
            ]}
          >
            <Input.Password placeholder="请输入" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="shop_name"
            label="商铺名称："
            rules={[
              {
                required: true,
                message: '请输入商铺名称',
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="shop_desc"
            label="商铺描述："
            rules={[
              {
                required: true,
                message: '请输入商铺描述',
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            name="shop_thumb"
            label="商铺logo："
            rules={[
              {
                required: true,
                message: '请添加商铺logo',
              },
            ]}
          >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/file/upload/"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </>
      ) : undefined}
    </Form>
  )
}
