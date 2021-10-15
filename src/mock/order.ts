import { mock, Random } from "mockjs";
import { CoffeOrder } from '@/pages/order/services'

// 获取订单列表
export function getOrders(): { data: CoffeOrder[] } {
    Random.float(20, 100)
    return mock({
        'list|10-20': [{
            name: '@cword(8, 16)',
            createTime: '@datetime',
            thumb: '@url',
            id: '@id',
            'statusInfo|1': [{
                status: 1,
                statusName: '待接单'
            }, {
                status: 2,
                statusName: '已接单'
            }, {
                status: 3,
                statusName: '已完结'
            }],
            'discount|0-5': [{
                full: '@integer(20, 40)',
                minus: '@integer(10, 20)'
            }],
            'goodsList|3-10': [{
                thumb: '@url',
                name: '@cword(5,10)'
            }],
            totalPrice: '@float(20,100)',
        }]
    })
}

export default [{
    url: '/api/order',
    method: 'get',
    response: ({ query }: any) => {
        return getOrders()
    },
    statusCode: 200
}, {
    url: '/api/order',
    method: 'put',
    response: ({ query }: any) => {
        return {
            data: 'ok'
        }
    },
    statusCode: 200
}, {
    url: '/api/config/accept',
    method: 'put',
    response: (request: any) => {
        return {
            data: request.body.value
        }
    },
    statusCode: 200
}]
