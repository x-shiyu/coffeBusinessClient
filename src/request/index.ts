import axios, { AxiosError } from 'axios'
import { message } from 'antd'
const instance = axios.create({
    baseURL: 'http://2.0.0.1:8001/api',
    timeout: 1000,
});
instance.interceptors.response.use((response) => {
    if (response.data) {
        return response.data
    }
    return response
}, (error: AxiosError) => {
    if (error && error.response && error.response.data) {
        if (error.response.status === 401) {
            setTimeout(() => {
                location.href = '/login'
            }, 1000)
        }
        message.error(error.response.data as any)
    }
    return Promise.reject(error)
})

export default instance

