import request from '@/request'

// 更新用户信息
export function updateUserInfo(params: any): Promise<{ data: string }> {
    return request.put('/api/user/password', params)
}

// 获取用户信息
export function getUserInfo() {
    return request.get('/user/info')
}

