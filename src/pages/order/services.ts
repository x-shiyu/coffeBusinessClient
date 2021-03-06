import request from '@/request'
export interface CoffeOrder {
    createTime: number,
    name: string,
    goodsList: ICoffeItem[]
    id: number,
    thumb: string,
    totalPrice: number,
    status: number,
    statusName: string,
    discount?: { full: number, minus: number }[]
}
export interface ICoffeItem {
    thumb: string
    name: string
}
export function getOrders(status?:string): Promise<CoffeOrder[]> {
    return request.get('/order/list/',{
      params:{
        status
      }
    })
}

