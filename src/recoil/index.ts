import { atom } from 'recoil'

interface UserInfo {
    email: string,
    vip_level?: number,
    id: number
    points?: number
    autoAccept?: boolean
    discount?: {
        full: number,
        minus: number
    }[]
}
export const authInfo = atom<UserInfo | Record<string, any>>({
    key: 'authInfo',
    default: {}
})


