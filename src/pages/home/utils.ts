import { CoffeOrderInfo } from "./service";

export interface FormattedCoffeInfo {
    categoryName: string,
    categoryId: number,
    children: CoffeOrderInfo[]
}
export function formatCoffeList(list: CoffeOrderInfo[]): FormattedCoffeInfo[] {
    const newList: FormattedCoffeInfo[] = []
    const newListMap: Record<string, any> = {}
    list.forEach((item) => {
        if (newListMap[item.categoryName]) {
            newListMap[item.categoryName].push(item)
        } else {
            newListMap[item.categoryName] = [item]
        }
    })
    return Object.keys(newListMap).map(item => {
        return {
            categoryName: item,
            categoryId: newListMap[item][0].categoryId,
            children: newListMap[item]
        }
    })
}