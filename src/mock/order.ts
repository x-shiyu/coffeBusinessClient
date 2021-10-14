import { mock, Random } from "mockjs";
import { CoffeOrder } from '@/pages/order/services'

// 获取订单列表
export function getOrders(): { data: CoffeOrder[] } {
    return mock({
        'list|10-20': [{
            name: '@cword(8, 16)',
            createTime: '@datetime',
            thumb: '@url',
            id: '@id',
            status: '进行中',
            'discount|0-5': [{
                full: Random.integer(20, 40),
                minus: Random.integer(10, 20)
            }],
            'goodsList|3-10': [{
                thumb: '@url',
                name: '@cword(5,10)'
            }],
            totalPrice: Random.float(20, 100)
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
}]
