import { mock, Random } from "mockjs";

export function updateUserInfo(params: { pwd: string, oldPwd: string }): { data: string } {
    return {
        data: 'ok'
    }
}

export function getUserInfo() {
    return mock({
        data: {
            email: '@email',
            nickname: '@cname',
            vip_level: '@integer(0,3)',
            points: '@integer(0,100000)',
        }
    })
}

export default [{
    url: '/api/user/password',
    method: 'put',
    response: ({ query }: any) => {
        return updateUserInfo(query)
    },
    statusCode: 200
}, {
    url: '/api/user/info',
    method: 'get',
    response: ({ query }: any) => {
        return getUserInfo()
    },
    statusCode: 200
}]
