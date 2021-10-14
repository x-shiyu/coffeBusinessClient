import request from '@/request'
export interface BusinessInfo {
    name: string,
    thumb: string,
    vote: number,
    monthSell: number,
    desc: string,
    id: number,
    discount?: {
        full: number
        minus: number
    }[]
}




export interface CoffeOrderInfo {
    categoryName: string,
    categoryId: number,
    name: string,
    monthSell: number,
    price: number,
    thumb: string,
    id: number
    canUsePoints: number
    discount?: {
        full: number
        minus: number
    }[]
}


// 获取所有商家
export function getBusiness(current = 1, keywords?: string, pageSize = 10): Promise<{ data: { total: number, list: BusinessInfo[] } }> {
    return request.get('/business', {
        params: {
            pageNo: current,
            pageSize,
            keywords
        }
    })
}

// 获取商家的所有商品
export function getCoffes(id: number): Promise<{ data: CoffeOrderInfo[] }> {
    return request.get('/business/coffe', {
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