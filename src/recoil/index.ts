import { atom } from 'recoil'

interface UserInfo {
    email: string,
    id: number
    abstract_money?: number
    shop_autoAccept?: boolean,
    shop_name:string,
    shop_thumb:string,
    shop_desc:string,
    shop_promotion?: {
        full: number,
        minus: number
    }[]
}
export const authInfo = atom<UserInfo | Record<string, any>>({
    key: 'authInfo',
    default: {}
})


