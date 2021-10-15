import { mock, Random } from "mockjs"
import { CoffeInfo } from "@/pages/home/service"
export function getCoffes(id: number): { data: CoffeInfo[] } {
    const categoryNameArr: any[] = []
    for (let i = 0; i < 5; i++) {
        categoryNameArr.push({
            name: Random.cword(3, 8),
            id: Random.natural(),
        })
    }
    const mockData: CoffeInfo[] = []
    for (let i = 0; i < Random.integer(14, 20); i++) {
        const categoryInfo = categoryNameArr[Random.integer(0, 4)]
        mockData.push({
            categoryName: categoryInfo.name,
            categoryId: categoryInfo.id,
            name: Random.cword(8, 16),
            monthSell: Random.integer(0, 300),
            price: Random.float(10, 30),
            thumb: Random.url(),
            id: Random.natural(),
            canUsePoints: Random.integer(100, 600),
        })
    }
    return {
        data: mockData
    }
}
export default [{
    url: '/api/goods/cate',
    method: 'post',
    response: (request: any) => {
        console.log(request);
        return {
            data: {
                id: Date.now(),
                name: request.body.cate,
                desc: request.body.desc,
            }
        }
    },
    statusCode: 200
}, {
    url: '/api/register',
    method: 'post',
    rawResponse: async (req: any, res: any) => {
        res.setHeader('Content-Type', 'text/plain')
        res.setHeader('cookie', '1111')
        res.statusCode = 200
        res.end(`ok`)
    },
}, {
    url: '/api/goods/cate',
    method: 'get',
    response: (request: any) => {
        return mock(
            {
                data: {
                    'list|10': [{
                        id: '@id',
                        name: '@cword(5,10)',
                        desc: '@cword(10,20)',
                    }],
                    total: 100
                }

            }
        )
    },
    statusCode: 200
}, {
    url: '/api/cate/coffe',
    method: 'get',
    response: (request: any) => {
        return getCoffes(request.query)
    },
}, {
    url: '/api/goods',
    method: 'put',
    response: (request: any) => {
        return {
            data: 'ok'
        }
    },
    statusCode: 200
}, {
    url: '/api/goods',
    method: 'post',
    response: (request: any) => {
        console.log(request);
        return {
            data: 'ok'
        }
    },
    statusCode: 200
}]