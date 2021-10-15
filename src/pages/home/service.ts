import request from '@/request'
export interface CoffeInfo {
    categoryName: string,
    categoryId: number,
    name: string,
    monthSell: number,
    price: number,
    thumb: string,
    id: number
    canUsePoints: number
}

export interface CateInfo {
    id: number,
    name: string,
    desc?: string
}

// 获取所有商家
export function getCates(current = 1, keywords?: string, pageSize = 10): Promise<{ data: { total: number, list: CateInfo[] } }> {
    return request.get('/goods/cate', {
        params: {
            pageNo: current,
            pageSize,
            keywords
        }
    })
}

// 获取商家的所有商品
export function getCoffes(id: number): Promise<{ data: CoffeInfo[] }> {
    return request.get('/cate/coffe', {
        params: {
            id
        }
    })
}

// 提交订单
export function submuitOrder(selected: any): Promise<any> {
    return request.post('/order', {
        selected
    })
}