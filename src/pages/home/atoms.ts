import { atom, selector, selectorFamily } from 'recoil'
import { BusinessInfo } from './service'

export const addOrderInfo = atom<Record<string, any>>({
    key: 'addOrderInfo',
    default: {}
})


export const addOrderAction = selectorFamily<number | undefined, any>({
    key: 'addOrderInfo',
    get: (id) => ({ get }) => {
        return get(addOrderInfo)[id]
    },
    set: (id) => ({ set, get }, newValue) => {
        set(addOrderInfo, {
            ...get(addOrderInfo),
            [id]: newValue
        })
    }
})


export const selectedCoffeNum = selector<any>({
    key: 'selectedCoffeNum',
    get({ get }) {
        const allSelected = get(addOrderInfo)
        return Object.values(allSelected).reduce<number>((total: number, current: any) => total + current, 0) || 0
    },
})


export const activeBusiness = selector<any>({
    key: 'activeBusiness',
    get({ get }) {
        const allSelected = get(addOrderInfo)
        return Object.values(allSelected).reduce<number>((total: number, current: any) => total + current, 0) || 0
    },
})


export const allBusiness = atom<BusinessInfo[]>({
    key: 'all-business',
    default: []
})