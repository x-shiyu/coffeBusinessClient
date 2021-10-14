
import React from 'react';
import { usePersistFn } from 'ahooks'
import { Form, Button, message } from 'antd';
import style from './style.module.css'
import { AuthBox } from '../components/AuthBox';
import request from '@/request'
import { useHistory, useRouteMatch } from 'react-router';
export default function Auth() {
    const [formLogin] = Form.useForm();
    const [formRegister] = Form.useForm();
    const history = useHistory();
    const isLogin = useRouteMatch('/login')
    const handleAuth = usePersistFn(() => {
        const form = isLogin ? formLogin : formRegister
        form.validateFields().then((values) => {
            if (isLogin) {
                request.post('/login', values).then(() => {
                    message.success('登录成功！')
                    setTimeout(() => {
                        history.push('/')
                    }, 1000)
                })
            } else {
                request.post('/register', values).then(() => {
                    message.success('注册成功！')
                    setTimeout(() => {
                        history.push('/login')
                    }, 1000)
                })
            }

        })
    })

    const jumpOther = () => {
        if (isLogin) {
            history.replace('/register')
        } else {
            history.replace('/login')
        }
    }
    return (
        <div>
            <h1 className='txc pt20'>{isLogin ? '登录' : '注册'}</h1>
            <div className={style['registerBox']}>
                <AuthBox isLogin={!!isLogin} form={isLogin ? formLogin : formRegister} />
                <div className='txc'>
                    <Button size='large' style={{ marginRight: '10px' }} type='primary' onClick={handleAuth}>{isLogin ? '登录' : '注册'}</Button>
                    <Button size='large' onClick={jumpOther}>{isLogin ? '注册' : '登录'}</Button>
                </div>
            </div>
        </div>
    )
}