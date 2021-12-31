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
export async function getCates(current = 1, keywords?: string, pageSize = 10): Promise<{ data: { total: number, list: CateInfo[] } }> {
  const response = await   request.get('/goods/cate', {
    params: {
        pageNo: current,
        pageSize,
        keywords
    }
})
  return  response.map((item:any)=>({
    name:item.fields.category_name,
    desc:item.fields.description,
    id:item.pk
  }))
}

// 获取商家的所有商品
export function getCoffes(id: number): Promise<{ data: CoffeInfo[] }> {
    return request.get('/goods/list/', {
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