import { useRouteMatch, useLocation } from 'react-router-dom'


export function useActiveTab(defaultKey: string) {
    const orderActive = useRouteMatch('/order')
    const userActive = useRouteMatch('/user')
    if (orderActive && orderActive.isExact) {
        return 'order'
    } else if (userActive && userActive.isExact) {
        return 'user'
    } else {
        return defaultKey
    }
}